const XLSX = require("xlsx");
const fs = require('fs');


function convertExcelToJson(path) {
  const workbook = XLSX.readFile(path);
  const sheet_name_list = workbook.SheetNames;
  const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
  return rows;
}
const translationMap = {};
const rows = convertExcelToJson("./excel.xlsx");
for (const row of rows) {
  for (const header of Object.keys(row)) {
    const { key } = row;
    translationMap[header] =
      header != "key"
        ? { ...translationMap[header], ...row[key] }
        : translationMap[header];
  }
}
for(language of Object.keys(translationMap) ){
    fs.writeFile(`languages/${language}.json`, json, 'utf8', function(err) {
        if (err) throw err;
        console.log(` ${language} is complete`);
        })

}

