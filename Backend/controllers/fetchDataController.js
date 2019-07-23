const fetchData = require("../models/fetchData");
var XLSX = require('xlsx');
var fs=require('fs');
const data = 
[
  ["03044373759", "Operator", "malik", "Lahre", "myeamil@gmail.com", "Enginerr"],
  ["03044373759", "Operator", "malik", "Lahre", "myeamil@gmail.com", "Enginerr"],
  ["03044373759", "Operator", "malik", "Lahre", "myeamil@gmail.com", "Enginerr"],
]

exports.writeData = (req, res)=>{
  var animalWS = XLSX.utils.json_to_sheet(data);
  var wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, animalWS, 'data')
  XLSX.writeFile(wb, 'F:/1.xlsx')
  console.log('Done...')
}

// Excel Show Data
  exports.fetchData = (req, res) => {
    var wb = XLSX.readFile('F:/1.xlsx')
    var ws = wb.Sheets["Sheet1"]
    var data=XLSX.utils.sheet_to_json(ws);
    data.forEach(function(dat){
      console.log(dat.Operator)
    })
};



exports.handleEnteData = (req,res) =>{
  console.log(req)
  console.log(req.body);
  console.log("DATA ATTEMPT FROM :" , req.body.Number)
    fetchData.findOne({Number: req.body.Number}, (err, account) => {
      if (err)
      {
        console.log("Error in Server " +account)
        res.status(500).send({'dataStatus':'failure','err':err});
      }
      if(account != null || account != undefined )
      {
        console.log("Account found")
        res.status(500).send({'dataStatus':'existing'});
      }
      
      else{
          console.log("Account not found, create account")
          let newAccount = new fetchData(req.body)
          newAccount.save((err, account) => {
            if (err) {
              console.log("failure in creating account",err);
              res.status(200).json({'dataStatus':'failure','err':err});
            }
            else{
              console.log("account created and list is "+account);
              res.status(200).json({'dataStatus':'created','todos':account});
            }
        });
  
    }
  });
  }
  


// From Excel to Database
exports.handleCreateData = (req, res)=>{
    var wb = XLSX.readFile('F:/1.xlsx')
    var ws = wb.Sheets["Sheet1"]
    var data=XLSX.utils.sheet_to_json(ws);
    
  for(var i=0;i<data.length;i++){
    let nums=data[i].Number;
    // fetchData.findOne({Number: nums}, (err, account) => {
    //   if (err)
    //   {
    //     console.log("Error in Server " +account)
    //     res.status(500).send({'dataStatus':'failure','err':err});
    //   }
    //   if(account!=null || account !=undefined)
    //   {
    //     console.log("Account found")
    //     res.status(500).send({'dataStatus':'existing'});
    //   }
    //   else{
        let ftchData=new fetchData();
        ftchData.Number=data[i].Number;
        ftchData.Operator=data[i].Operator;
        ftchData.Name=data[i].Name;
        ftchData.City=data[i].City;
        ftchData.Email=data[i].Email;
        ftchData.Category=data[i].Category;
        ftchData.save();
    //   }
    // });
    //sdf={Number: data[i].Number}
    // fetchData.find(sdf, (err, accounts) => {
    //   if (err) {
    //     console.log("ERROR in database............");
    //     //res.status(500).send(err);
    //   }
    //   console.log(accounts)
    //   //res.status(200).json(accounts);
    // });
      
    
      
    
    
    // ftchData.save((err, account)=>{
    //   if (err) {
    //     console.log("ERROR in database............");
    //     res.status(500).send(err);
    //   }
    //   console.log("Created")
    //   res.status(200).json(account);
      
    // });  
  }
  
}

// Show Data
exports.handleShow = async (req, res)=>{
  fetchData.find({})
    .then(data => {
      console.log("Get all Data ")
        res.status(200).json({'dataStatus':'found','todos':data});
    }).catch(err => {
      res.status(500).json({'dataStatus':'not_found','err':err});
  });
} 



function ec(r, c){
  return XLSX.utils.encode_cell({r:r,c:c});
}
function delete_row(ws, row_index){
  var variable = XLSX.utils.decode_range(ws["!ref"])
  for(var R = row_index; R < variable.e.r; ++R){
    for(var C = variable.s.c; C <= variable.e.c; ++C){
      ws[ec(R,C)] = ws[ec(R+1,C)];
    }
  }
  variable.e.r--
  ws['!ref'] = XLSX.utils.encode_range(variable.s, variable.e);
}




// delete from file
exports.deleteFileItem = (req, res) => {
var filename = 'F:/1.xlsx'
var workbook = XLSX.readFile(filename)
var worksheet = workbook.Sheets[workbook.SheetNames[0]]
delete_row(worksheet, 4)
XLSX.writeFile(workbook, filename)
console.log('asdasd')
}

// Delete item
exports.delteItem=(req, res)=>{
  // var wb = XLSX.readFile('F:/1.xlsx')
  // var ws = wb.Sheets["Sheet1"]
  // var data=XLSX.utils.sheet_to_json(ws);
  query={Number: req.params.Number}
  fetchData.deleteMany({Number: req.params.Number}, (err, accounts) => {
      if (err) {
        console.log("ERROR in database............");
        res.status(500).send(err);
      }

      res.status(200).json(accounts);
    });
  // reading file and then delete
  // var filename = 'F:/1.xlsx'
  // var workbook = XLSX.readFile(filename)
  // var worksheet = workbook.Sheets[workbook.SheetNames[0]]
  // let num
  // for(var i=0;i<data.length;i++){
  //   if(query!=data[i].Number){
  //     res.status(404).json({'dataStatus':'not_found','todos':'none'});
  //     continue;
  //   }
    // delete_row(worksheet, i)
    // XLSX.write(workbook, filename)
    // num=data[i]
    // console.log(num);
  
  // }
}


// This code is for delete file and all its data
  // var filePath = 'F:/1.xlsx'; 
  // fs.unlinkSync(filePath);
// Delete From Database
exports.delData = (req,res) =>{
    console.log("Deleting Data!")
    fetchData.deleteMany({}, (err, accounts) => {
      if (err) {
        console.log("ERROR in database............");
        res.status(500).send(err);
      }
      res.status(200).json(accounts);
    });
  }