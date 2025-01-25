export async function fetchTeachersName(){
    const res = await fetch('/api/teachers');
   const data = await res.json();
    return data.teachers;
}