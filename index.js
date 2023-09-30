const express = require("express")
const db = require("./db")
const studentdata = require("./schema")
const app = express()
app.use(express.json())

app.get("/", async (req, res) => {
    const { gender } = req.query
    const data = await studentdata.find({gender:"Female"}).count()
    res.status(200).json({ data });

})

app.get("/malemarks", async (req, res) => {
    const { gender, maths, science, english } = req.query
    const data = await studentdata.find( {gender: "Male"}, {maths: { $gt: 85 }}, {science: { $gt: 85 }}, {english: { $gt: 85 }} ).count()
    res.status(200).json({ data });
})

app.get("/marks",async(req,res)=>{
    const { maths, english } = req.query
    const data = await studentdata.find({maths:{$gt:50,$lt:75},english:{$gt:50,$lt:75}}).count();
    res.status(200).json({ data });
})

app.get("/class",async(req,res)=>{
    const {maths, english ,science} = req.query
    const data = await studentdata.find({class:{$gte:"I",$lte:"IV"}  ,maths:{$gt:50},english:{$gt:50},science:{$gt:50}}).count();
    res.status(200).json({ data });
})

app.get("/grade",async(req,res)=>{
    const {gender,section,maths,science,english}=req.query
    const data = await studentdata.find(
        {gender: "Female"},
        {class: "X"},
        {section: "A"},
        {maths: { $lt: 25 }},
        {science: { $lt: 25 }},
        {english: { $lt: 25 }}
      )
    res.status(200).json({ data });
})

app.get("/mathsscore",async(req,res)=>{
    const{maths}=req.query
    const data = await studentdata.find({"class": "V"}).sort({"maths": -1}).limit(3)
    res.status(200).json({ data });
})

app.get("/sciencescore",async(req,res)=>{
    const{science}=req.query
    const data = await studentdata.find({"class": "I"}).sort({"science": 1}).limit(5)
    res.status(200).json({ data });
})

app.get("/lt50score",async(req,res)=>{
    const{section,maths,science,english}=req.query
    const data = await studentdata.find({
        section: "A",
        maths: { $lt: 50 },
        science: { $lt: 50 },
        english: { $lt: 50 },
      });
    res.status(200).json({data})
})

app.get("/gt75score",async(req,res)=>{
    const{section,maths,science,english}=req.query
    const data = await studentdata.find({
        section: "C",
        maths: { $gt: 75 },
        science: { $gt: 75 },
        english: { $gt: 75 },
      });
    res.status(200).json({data})
})

app.get("/fallmaths",async(req,res)=>{
    const{maths}=req.query
    const data = await studentdata.find().sort({ maths: 1 }).skip(20).limit(10);
    res.status(200).json({data})
})

app.get("/scitopscore",async(req,res)=>{
    const{science}=req.query
    const data = await studentdata.find().sort({"science":-1}).skip(80).limit(20)
    res.status(200).json({data})
})

app.get("/femaletopscore",async(req,res)=>{
    const{gender}=req.query
    const data = await studentdata.find({"gender": "female"}).sort({"science":1,"maths":1}).skip(15).limit(5)
    res.status(200).json({data})
})

app.listen(8090, () => {
    console.log("listing port 8090");
    db()
})  