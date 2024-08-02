const express = require("express");
const connection = require("./db/connection");
const dotenv = require("dotenv").config();
const cors = require("cors")
const mainRoute = require("./routes/details.route")
const nodemailer = require("nodemailer")

const app = express();
const PORT = 7000;
app.use(express.json())
app.use(cors())

const transporter = nodemailer.createTransport({
    service:"hotmail",
    auth :{
        user:"neerajpant.personal@outlook.com",
        pass:"@qazwsx@123456789thyle"
    }
})

app.post('/sendmail',(req,res)=>{
    const data = req.body

    const createHtmlTable = (data) => {
        const headers = Object.keys(data[0]);
        const rows = data.map(row => 
          `<tr>${headers.map(header => `<td>${row[header]}</td>`).join('')}</tr>`
        ).join('');
    
        return `
          <table border="1" cellpadding="5" cellspacing="0">
            <thead>
              <tr>${headers.map(header => `<th>${header}</th>`).join('')}</tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
        `;
      };
    
    const htmlTable = createHtmlTable(data);

    const options = {
        from : "neerajpant.personal@outlook.com",
        to : "info@redpositive.in",
        subject : "table entries Assignment by neeraj Pant",
        text : "data",
        html : htmlTable
    }
    
    transporter.sendMail(options,(err,info)=>{
        if(err){
            console.log(err)
            return
        }
        console.log(info.response)
    })
})

app.use('/api/v1/entries',mainRoute)

app.listen(PORT,()=>{
    connection();
    console.log("server is running at the port "+ PORT)
})