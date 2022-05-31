$(document).ready(function () {

    let winners = $('#winners'),
        namesCont = $('#names'),
        checkNames = $('#checkNames'),
        starterr = $('#start-err'),
        uploaderr = $('#upload-err'),
        doneerr = $('#done-err'),
        fileInput = $('#file-input'),
        title = $('#title'),
        popSet = $('#pop-set'),
        numWin = $('#num-win'),
        AwardsBg = $('#awards-bg'),
        container = $('#container'),
        time = 5000,
        i = 0,
        started = '',
        uploaded = '',
        randomItem,
        numWinners = 0,
        maxNumWinners,
        myArray = [
            "الفائز الأول",
            "الفائز الثاني",
            "الفائز الثالث",
            "الفائز الرابع",
            "الفائز الخامس",
            "الفائز السادس",
            "الفائز السابع",
            "الفائز الثامن",
            "الفائز التاسع",
            "الفائز العاشر",
            "الفائز الحادي عشر",
            "الفائز الثاني عشر",
            "الفائز الثالث عشر",
            "الفائز الرابع عشر",
            "الفائز الخامس عشر",
            "الفائز السادس عشر",
            "الفائز السابع عشر",
            "الفائز الثامن عشر",
            "الفائز التاسع عشر",
        ],
        awardsArray = [];



    $('#done').on('click', function () {
        if (fileInput.val() == '') {
            doneerr.css('display', 'block')
            doneerr.text('يجب اختيار الملف اولا')
        }
        else if (parseInt(numWin.val()) == 0) {
            doneerr.css('display', 'block')
            doneerr.text('يجب اختيار عدد الفائزين')
        }
        else {
            popSet.css('display', 'none')
            maxNumWinners = parseInt(numWin.val())
            let awardsInput = $('#awards-bg input');
            for (let i = awardsArray.length; i < awardsInput.length; i++) {
                awardsArray.push($(awardsInput[i]).val())
            }
        }
    });

    $('#setting-icon').on('click', function () {
        popSet.css('display', 'flex')
        awardsArray = []
    });

    $('#plus').on('click', function () {
        let val = parseInt(numWin.val())
        doneerr.css('display', 'none')
        if (val != myArray.length) {
            numWin.val(val + 1)
            AwardsBg.append('<input type="text" class="awards" id="award-' + val + '" value="" placeholder="جائزة ' + myArray[val] + '"/>')
            // $(".awards").focusout(function () {
            //     console.log('jjj');
            //     let text = $(this).val();
            //     if (!/^\s*$/.test(text)) {
            //         $(this).remove();
            //         AwardsBg.append('<div class="text-bg"><span>' + text + '</span></div>')
            //     }
            // });
        }
    });

    $('#minus').on('click', function () {
        let val = parseInt(numWin.val())
        if (val != 0) {
            numWin.val(val - 1)
            AwardsBg.children("input:last").remove();
        }
    });




    //start comp
    $('#start').on('click', function () {
        if (checkNames.val() == '') {
            starterr.css('display', 'block')
            starterr.text('يجب اضافة الأسماء اولا')
        }
        // else if (fileInput.val() == '') {
        //     starterr.css('display', 'block')
        //     starterr.text('يجب اختيار الملف اولا')
        // }
        else {
            if (started == '') {
                namesCont.fadeIn();
                starterr.css('display', 'none')
                startTime();
                title.text(' اسم ' + myArray[numWinners])
                started = 'done';
                $('#start').fadeOut();
            }
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
            if (numWinners == maxNumWinners - 1) {
                namesCont.fadeOut();
                title.text('انتهي السحب')
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
        let phone = $(randomItem).find(".phone");
        let awardTitle = '';
        if (!/^\s*$/.test(awardsArray[numWinners])) {
            awardTitle = '<p class="p award-title">جائزة الفائز : ' + awardsArray[numWinners] + '</p>'
        }
        $('<div class="information"><p class="p title-win">' + myArray[numWinners] + '</p>' + awardTitle + '<p class="p name">'
            + name.text() + '</p>').appendTo(winners);
        let id = $(randomItem).attr('id');
        let test = $('#' + id);
        $(test).attr('data-id', 1);
        $(test).css('display', 'none');
    }

    let selectedFile;
    document.getElementById('file-input').addEventListener("change", (event) => {
        selectedFile = event.target.files[0];
        // uploaded = '';
        $('#file-name').text('لم يتم اختيار ملف')
        if (fileInput.val() != '') {
            $('#file-name').text(fileInput.val())
            uploaderr.css('display', 'none')
            $('#button').fadeIn()
        }
    })

    let data = [{
        "name": "jayanth",
        "data": "scd",
        "abc": "sdef"
    }]

    $('#button').on("click", () => {
        if (fileInput.val() == '') {
            uploaderr.css('display', 'block')
            uploaderr.text('يجب اختيار الملف اولا')
        } else {
            // if (uploaded == '') {
            //     uploaded = 'done'
            $('#start').css('display', 'flex')
            XLSX.utils.json_to_sheet(data, 'out.xlsx');
            if (selectedFile) {
                let fileReader = new FileReader();
                fileReader.readAsBinaryString(selectedFile);
                fileReader.onload = (event) => {
                    let data = event.target.result;
                    let workbook = XLSX.read(data, { type: "binary" });
                    workbook.SheetNames.forEach(sheet => {
                        let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                        createNames(rowObject);
                    });
                }
                // }
            }
            $('#upload-btn').fadeOut();
            $('#file-name').text('تم تحميل الملف')
            $('#file-name').css('background-color', '#1a880b')
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