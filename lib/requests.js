const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || 'http://localhost:3000' ;

async function fetchInstruments() {
    
        const res = await fetch(`${apiDomain}/api/instruments`, {
            method: 'GET',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json'
            }});
        if (!res.ok) {
            throw new Error('Failed to Fetch Instruments');
        }
        return await res.json();
}

async function fetchInstrument (id){
    try {
        if(!apiDomain){
            return null;
        }
        const res = await fetch(`${apiDomain}/api/instruments/${id}`);
         if(!res.ok){
            throw new Error("Fail To Fetch Data")
         }
         return res.json();
    } catch (error) {
        console.log(error);
        return null;
    }
}

async function fetchComments() {
    
    const res = await fetch(`${apiDomain}/api/comments` , {
        method: 'GET',
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json'
        }});
    if (!res.ok) {
        throw new Error('Failed to Fetch Comments');
    }
    return await res.json();
} 

async function fetchCourse (id){
    try {
        if(!apiDomain){
            return null;
        }
        const res = await fetch(`${apiDomain}/api/courses/${id}`);
         if(!res.ok){
            throw new Error("Fail To Fetch Data")
         }
         return res.json();
    } catch (error) {
        console.log(error);
        return null;
    }
}

async function fetchTeacher (id){
    try {
        if(!apiDomain){
            return null ;
        }
        const res = await fetch(`${apiDomain}/api/teachers/${id}`);
            if(!res.ok){
                throw new Error("Fail To Fetch Data");
        }
        return res.json();
    } catch (error) {
        console.log(error);
        return null;
    }
}

async function fetchStudent (id){
    try {
        if(!apiDomain){
            return null ;
        }
        const res = await fetch(`${apiDomain}/api/students/${id}`);
            if(!res.ok){
                throw new Error("Fail To Fetch Data");
        }
        return res.json();
    } catch (error) {
        console.log(error);
        return null;
    }
}

async function fetchBlog (id){
    try {
        if(!apiDomain){
            return null;
        }
        const res = await fetch(`${apiDomain}/api/blogs/${id}`);
        if(!res.ok){
            throw new Error("Fail To Fetch Data");
        }
        return res.json();
    } catch (error) {
        console.log(error);
        return null;
    }
}

async function fetchSong(id){
    try {
        if(!apiDomain){
            return null;
        }
        const res = await fetch(`${apiDomain}/api/songs/${id}`);
        if(!res.ok){
            throw new Error("Fail To Fetch Data");
        }
        return res.json();
    } catch (error) {
        console.log(error);
        return null;
    }
}

async function fetchPhoto(id){
    try {
        if(!apiDomain){
            return null;
        }
        const res = await fetch(`${apiDomain}/api/gallery/photos/${id}`, {
            method: 'GET',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json'
            }});
        if(!res.ok){
            throw new Error("Fail To Fetch Data");
        }
        return res.json();
    } catch (error) {
        console.log(error);
        return null;
    }
}

async function fetchVideo(id){
    try {
        if(!apiDomain){
            return null;
        }
        const res = await fetch(`${apiDomain}/api/gallery/videos/${id}`, {
            method: 'GET',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json'
            }});
        if(!res.ok){
            throw new Error("Fail To Fetch Data");
        }
        return res.json();
    } catch (error) {
        console.log(error);
        return null;
    }
}

async function fetchSongs(){
    const res = await fetch(`${apiDomain}/api/songs`, {
        method: 'GET',
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json'
        }});
    if (!res.ok) {
      throw new Error('Failed to fetch Songs');
    }
    return res.json();
}

async function fetchCourses(){
    const res = await fetch(`${apiDomain}/api/courses`, {
        method: 'GET',
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json'
        }});
    if (!res.ok) {
      throw new Error('Failed to fetch Courses');
    }
    return res.json();
}

async function fetchTeachers(){
    const res = await fetch(`${apiDomain}/api/teachers`, {
        method: 'GET',
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json'
        }});
    if (!res.ok) {
      throw new Error('Failed to fetch Teachers');
    }
    return res.json();
}

async function fetchBlogs(){
    const res = await fetch(`${apiDomain}/api/blogs` , {
        method: 'GET',
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json'
        }});
    if (!res.ok) {
      throw new Error('Failed to fetch Blogs');
    }
    return res.json();
}

async function fetchPhotos(){
    const res = await fetch(`${apiDomain}/api/gallery/photoGallery`);
    if (!res.ok) {
      throw new Error('Failed to fetch Photos');
    }
    return res.json();
}
async function fetchVideos(){
    const res = await fetch(`${apiDomain}/api/gallery/videos`);
    if (!res.ok) {
      throw new Error('Failed to fetch Videos');
    }
    return res.json();
}
async function fetchGuidances(){
    const res = await fetch(`${apiDomain}/api/guidances`, {
        method: 'GET',
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json'
        }});
    if (!res.ok) {
      throw new Error('Failed to fetch Guidances');
    }
    return res.json();
}

export {fetchCourse , fetchTeacher , fetchBlog , fetchSong , fetchStudent , fetchSongs , fetchCourses , fetchTeachers , fetchBlogs , fetchInstruments,fetchInstrument, fetchComments , fetchPhotos , fetchVideos, fetchPhoto , fetchVideo , fetchGuidances};
