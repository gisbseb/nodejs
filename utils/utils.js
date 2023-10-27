import pug from "pug";
import { students } from "../data/students.js";
import querystring from "node:querystring";
import { text } from "node:stream/consumers";
import dayjs from "dayjs";

export const getTemplate = (template, data) => {
  const toRender = pug.renderFile(template, data, (err, html) => {
    if (err) throw err;
    return html;
  });
  return toRender;
};

export const getParsedParams = async (data) =>{
    const params = await text(data);
    const parsedParams = querystring.parse(params);
    return parsedParams
}

export const getStudents = () =>{
    
   students.forEach(student =>{
         student.birth = dayjs(student.birth).format('DD/MM/YYYY') === "Invalid Date" ? student.birth : dayjs(student.birth).format('DD/MM/YYYY') 
    })
   
    return students
        
}

export const createStudent = (student) => {
 
    student.birth = dayjs(student.birth).format()
    students.push(JSON.parse(JSON.stringify(student)));

};

export const deleteStudent = (studentToRemove) => {

    let index = null
    for(let i = 0; i < students.length; i++){
   
        if(students[i].name == studentToRemove.name && students[i].birth === studentToRemove.birth){
            index = i
            break
        }
    }
    students.splice(index,1)
};