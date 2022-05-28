$(document).ready(function () {

    let winners = $('#winners'),
        namesCont = $('#names'),
        checkNames = $('#checkNames'),
        title = $('#title'),
        time = 5000,
        i = 0,
        randomItem,
        numWinners = 0,
        myArray = [
            "الفائز الأول",
            "الفائز الثاني",
            "الفائز الثالث",
            "الفائز الرابع",
            "الفائز الخامس",
            "الفائز السادس",
        ];
    //start comp
    $('#start').one('click', function () {
        if (checkNames.val() == '') {
            alert('select file first')
        } else {
            startTime();
            title.text(' اسم ' + myArray[numWinners])
        }
    });


    function startTime() {
        let names = $('#names .information[data-id = 0]');
        timeoutExample = setTimeout(function () {
            if (time == 0) {
                clearTimeout(timeoutExample);
            }
            else {
                for (let x = 0; x < names.length; x++) {
                    names[x].style.display = "none";
                }
                names[i].style.display = "flex";
                i++
                if (i == names.length) {
                    console.log('ok');
                    i = 0;
                }
                time = time - 50;
                if (time == 0) {
                    if (i > 0) {
                        i = 0;
                    }
                    for (let x = 0; x < names.length; x++) {
                        names[x].style.display = "none";
                    }
                    console.log(names.length);
                    randomItem = names[Math.floor(Math.random() * names.length)];
                    randomItem.style.display = "flex";
                    showWinner();
                }
                startTime();
            }
        }, 50);
    }

    function showWinner() {
        timeoutExample = setTimeout(function () {
            createWinnerContent()
            if (numWinners == 4) {
                console.log('finish');
            }
            else {
                time = 5000;
                numWinners++;
                title.text(' اسم ' + myArray[numWinners])
                startTime();
            }
        }, 2000);
    }

    function createWinnerContent() {
        let name = $(randomItem).find(".name");
        let phone = $(randomItem).find(".number");
        $('<div class="information"><p class="title-win">' + myArray[numWinners] + '</p><p class="name">' + name.text() + '</p><p class="phone">' + phone.text() + '</p>').appendTo(winners);
        let id = $(randomItem).attr('id');
        let test = $('#' + id);
        $(test).attr('data-id', 1);
        $(test).css('display', 'none');
    }

    let selectedFile;
    document.getElementById('input').addEventListener("change", (event) => {
        selectedFile = event.target.files[0];
    })

    let data = [{
        "name": "jayanth",
        "data": "scd",
        "abc": "sdef"
    }]

    document.getElementById('button').addEventListener("click", () => {
        XLSX.utils.json_to_sheet(data, 'out.xlsx');
        if (selectedFile) {
            let fileReader = new FileReader();
            fileReader.readAsBinaryString(selectedFile);
            fileReader.onload = (event) => {
                let data = event.target.result;
                let workbook = XLSX.read(data, { type: "binary" });
                // console.log(workbook);
                workbook.SheetNames.forEach(sheet => {
                    let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                    createNames(rowObject);
                });
            }
        }
    });
    function createNames(rowObject) {
        for (let i = 0; i < rowObject.length; i++) {
            $('<div class="information" id="info-' + i + '"  data-id=0><p class="name">' + rowObject[i].name + '</p><p class="phone">'
                + rowObject[i].number + '</p>').appendTo(namesCont);
        }
        $(checkNames).val('names is insert')
    }
});