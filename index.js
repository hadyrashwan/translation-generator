const XLSX = require("xlsx");
const fs = require('fs');

// constants
const languageDirectory = 'languages'
const excelFilePath='./excel.xlsx'

//create array of jsons from excel file
function convertExcelToJson(path) {
  const workbook = XLSX.readFile(path);
  const sheet_name_list = workbook.SheetNames;
  const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
  return rows;
}

// create big json from excel rows 
const translationMap = {};
const rows = convertExcelToJson(excelFilePath);
for (const row of rows) {
  // console.log( Object.keys(row))

  for (const header of Object.keys(row)) {
    const key  = row.Key;
    if(header != 'Key'){
      const object = typeof translationMap[header] == 'undefined'?  {}  : translationMap[header]
      object[key] = row[header] 
      translationMap[header] = object
    }
  }
}


// create folder if it doesnt exist
if (!fs.existsSync(languageDirectory)){
  fs.mkdirSync(languageDirectory);
}
// create files
for(language of Object.keys(translationMap) ){
  console.log(`writing ${language}`)
    fs.writeFile(`${languageDirectory}/${language}.json`, JSON.stringify(translationMap[language]), 'utf8', function(err) {
        if (err) throw err;
        console.log(`language is complete`);
        })
}

