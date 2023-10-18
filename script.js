

const teacherEl = document.getElementById('teacher')
const classesEl = document.getElementById('classes')
const classEl1 = document.getElementById('classpick1')
const classEl2 = document.getElementById('classpick2')
const schoolEl = document.getElementById('school')
const periodlEl = document.getElementById('period')

window.addEventListener('load', () => {
    classesEl.innerHTML = '<div><label for="classpick" class="form-label"><span style="color: red;">* </span>اسم الحلقة</label>'
    schoolEl.innerHTML = '<div><label for="schoolpick" class="form-label"><span style="color: red;">* </span>تصنيف الحلقة</label>'
    periodlEl.innerHTML = '<div><label for="periodpick" class="form-label"><span style="color: red;">* </span>وقت الزيارة</label>'
})

fetch('./data.json').then(resp => resp.json()).then(data => {

    const teachers = Object.keys(data)

    const teachersoptions = []
    teachers.forEach(teacher => {
        teachersoptions.push(`<option value="${teacher}">${teacher}</option>`)
    })

    teacherEl.innerHTML = '<option value="" selected></option>' +  teachersoptions


    teacherEl.addEventListener('change', (e) => {
        
        const school = Object.fromEntries(Object.entries(data).filter(([key]) => key.includes(e.target.value)));


        // school[e.target.value].length > 1

        
        if(undefined !== school[e.target.value] && school[e.target.value].length > 1) {

            const data1 = '<div><label for="classpick1" class="form-label"><span style="color: red;">* </span>اسم الحلقة</label><select id="classpick1" name="entry.1820153082" class="form-select"  required><option value="" selected></option>'
            const classoptions = []
            for(let i = 0; i < school[e.target.value].length; i++) {
                classoptions.push(`<option value="${school[e.target.value][i].class}">${school[e.target.value][i].class}</option>`)
            }

            classesEl.innerHTML = data1 + classoptions + '</select></div>'


        }
       
        if(undefined !== school[e.target.value] && school[e.target.value].length == 1) {

            const labelclass = '<div><label for="classpick2" class="form-label"><span style="color: red;">* </span>اسم الحلقة</label>'
            const inputclass = `<input type="text" class="form-control" name="entry.1820153082" id="classpick2" value="${school[e.target.value][0].class}" readonly>`

            const labelscholl = '<div><label for="schoolpick" class="form-label"><span style="color: red;">* </span>تصنيف الحلقة</label>'
            const inputscholl = `<input type="text" class="form-control" id="schoolpick" name="entry.474311581" value="${school[e.target.value][0].school}" readonly>`

            const labelperiod = '<div><label for="periodpick" class="form-label"><span style="color: red;">* </span>وقت الزيارة</label>'
            const inputperiod = `<input type="text" class="form-control" id="periodpick" name="entry.520089605" value="${school[e.target.value][0].period}" readonly>`

            classesEl.innerHTML = labelclass + inputclass
            schoolEl.innerHTML = labelscholl + inputscholl
            periodlEl.innerHTML = labelperiod + inputperiod
        }


        if(teacherEl.value == '') {
            classesEl.innerHTML = '<div><label for="classpick" class="form-label"><span style="color: red;">* </span>اسم الحلقة</label>'
            schoolEl.innerHTML = '<div><label for="schoolpick" class="form-label"><span style="color: red;">* </span>تصنيف الحلقة</label>'
            periodlEl.innerHTML = '<div><label for="periodpick" class="form-label"><span style="color: red;">* </span>وقت الزيارة</label>'
        }


        if(classesEl) {
            classesEl.addEventListener('change', (e) => {
                const schoolpick = school[document.getElementById('teacher').value].filter((record) =>  record.class == e.target.value);

                for(let i = 0; i < schoolpick.length; i++) {
                    const labelscholl = '<div><label for="schoolpick" class="form-label"><span style="color: red;">* </span>تصنيف الحلقة</label>'
                    const inputscholl = `<input type="text" class="form-control" id="schoolpick" name="entry.474311581" value="${schoolpick[i].school}" readonly>`
                    
                    const labelperiod = '<div><label for="periodpick" class="form-label"><span style="color: red;">* </span>وقت الزيارة</label>'
                    const inputperiod = `<input type="text" name="entry.520089605" class="form-control" id="periodpick" value="${schoolpick[i].period}" readonly>`

                    schoolEl.innerHTML = labelscholl + inputscholl
                    periodlEl.innerHTML = labelperiod + inputperiod
                }
    
            })
        }
        




    })  
    
    

    




})

                    


