export async function fetchTeachersName(){
    const res = await fetch('http://localhost:3000/api/teachers');
   const data = await res.json();
    return data.teachers;
}