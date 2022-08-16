$(document).ready(function () {

    let winners = $('#winners'),
        namesCont = $('#names'),
        checkNames = $('#checkNames'),
        starterr = $('#start-err'),
        uploaderr = $('#upload-err'),
        shuffleTime = $('#shuffle-time'),
        timeerr = $('#time-err'),
        doneerr = $('#done-err'),
        fileInput = $('#file-input'),
        title = $('#title'),
        popSet = $('#pop-set'),
        numWin = $('#num-win'),
        AwardsBg = $('#awards-bg'),
        time,
        i = 0,
        started = '',
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


    //btn settings to start
    $('#done').on('click', function () {
        if (fileInput.val() == '') {
            doneerr.css('display', 'block')
            doneerr.text('يجب اختيار الملف اولا')
        }
        else if (parseInt(numWin.val()) == 0) {
            doneerr.css('display', 'block')
            doneerr.text('يجب اختيار عدد الفائزين')
        }
        else if (shuffleTime.val() == '' || shuffleTime.val() > 60) {
            // console.log('hi');
            doneerr.css('display', 'block')
            doneerr.text('يجب وضع وقت صحيح')
        }
        else {
            doneerr.css('display', 'none')
            popSet.css('display', 'none')
            maxNumWinners = parseInt(numWin.val())
            let awardsInput = $('#awards-bg input');
            for (let i = awardsArray.length; i < awardsInput.length; i++) {
                awardsArray.push($(awardsInput[i]).val())
            }
        }
    });

    // icon setting open to edit
    $('#setting-icon').on('click', function () {
        if (started == '') {
            popSet.css('display', 'flex')
            awardsArray = []
        } else {
            return false;
        }
    });

    // btn to add more winner
    $('#plus').on('click', function () {
        let val = parseInt(numWin.val())
        doneerr.css('display', 'none')
        if (val != myArray.length) {
            numWin.val(val + 1)
            AwardsBg.append('<input type="text" class="awards" id="award-' + val + '" value="" placeholder="جائزة ' + myArray[val] + '"/>')
        }
    });

    //btn to remove winner
    $('#minus').on('click', function () {
        let val = parseInt(numWin.val())
        if (val != 0) {
            numWin.val(val - 1)
            AwardsBg.children("input:last").remove();
        }
    });

    //make time to shuffle
    shuffleTime.on('input', function () {
        $(this).val($(this).val().replace(/[^-.0-9٠-٩]/g, ''));
    });
    shuffleTime.focusin('click', function () {
        $(this).css({
            "border": "3px solid #4245a8",
            "color": "#4245a8"
        });
        timeerr.css('display', 'none')
    });
    shuffleTime.focusout(function (e) {
        if ($(this).val() > 60) {
            $(this).css({
                "border": "3px solid #ff1c1c",
                "color": "#ff1c1c"
            });
            timeerr.css('display', 'block')
            timeerr.text('يجب اختيار وقت من اقل من 60')
        }
    });



    //start comp
    $('#start').on('click', function () {
        if (checkNames.val() == '') {
            starterr.css('display', 'block')
            starterr.text('يجب اضافة الأسماء اولا')
        }
        else {
            if (started == '') {
                namesCont.fadeIn();
                starterr.css('display', 'none')
                title.text(' اسم ' + myArray[numWinners])
                started = 'done';
                $('#start').fadeOut();
                $('#time-countdown').fadeIn();
                $('#time-countdown').css('display', 'flex')
                time = shuffleTime.val() * 1000;
                startTime();
                countdownTimer();
            }
        }
    });

    //time for take one winner
    function startTime() {
        let names = $('#names .information[data-id = 0]');
        timeoutExample = setTimeout(function () {
            if (time == 0) {
                clearTimeout(timeoutExample);
            }
            else {
                for (let x = 0; x < names.length; x++) {
                    names[x].style.display = "none";
                    // $(names[x]).fadeOut();
                }
                $(names[i]).fadeIn(40);
                names[i].style.display = "flex";
                // names[i].style.color = "#000";
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
                    $(randomItem).fadeIn()
                    randomItem.style.display = "flex";
                    showWinner();
                }
                startTime();
            }
        }, 50);
    }

    //countdown timer view
    function countdownTimer() {
        let countDownTimer = setInterval(setcountDownTimer, 1000);
        let seconds = shuffleTime.val() - 1;
        function setcountDownTimer() {
            seconds = seconds < 10 ? '0' + seconds : seconds;
            $('#time-countdown').text(seconds);
            seconds--;
            if (seconds < 0) {
                stopcountDownTimer();
            }
        }
        function stopcountDownTimer() {
            clearInterval(countDownTimer);
        }
    }

    //to show winner 
    function showWinner() {
        timeoutExample = setTimeout(function () {
            createWinnerContent()
            if (numWinners == maxNumWinners - 1) {
                namesCont.fadeOut();
                $('#again').fadeOut();
                $('#time-countdown').fadeOut();
                title.text('انتهي السحب')
            }
            else {
                $('#again').text('');
                $('#again').append(' <i style="-webkit-transform: scaleX(-1);transform: scaleX(-1);" class="fa-solid fa-caret-right"></i> اسم ' + myArray[numWinners + 1])
                $('#again').fadeIn();
                title.fadeOut();
                time = shuffleTime.val() * 1000;
                numWinners++;
                $('#again').one('click', function () {
                    $('#again').fadeOut();
                    title.fadeIn();
                    title.text(' اسم ' + myArray[numWinners])
                    startTime();
                    countdownTimer();
                });
            }
        }, 2000);
    }

    //show winener in winners container
    function createWinnerContent() {
        let name = $(randomItem).find(".name");
        let phone = $(randomItem).find(".phone");
        let awardTitle = '';
        if (!/^\s*$/.test(awardsArray[numWinners])) {
            awardTitle = '<p class="p award-title">جائزة الفائز : ' + awardsArray[numWinners] + '</p>'
        }
        $('<div class="information"><p class="p title-win">' + myArray[numWinners] + '</p>' + awardTitle + '<p class="p name">'
            + name.text() + '</p><p class="p phone">' + phone.text() + '</p>').appendTo(winners);
        let id = $(randomItem).attr('id');
        let target = $('#' + id);
        // $(target).attr('data-id', 1);
        // $(target).css('display', 'none');
        removeRepeatNames(name.text(), phone.text());
    }

    //load file 
    let selectedFile;
    document.getElementById('file-input').addEventListener("change", (event) => {
        selectedFile = event.target.files[0];
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
            $('#start').css('display', 'block')
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
        // test();
    }

    function removeRepeatNames(name, phone) {
        let names = $('#names .information .name');
        let phones = $('#names .information .phone');
        let information = $('#names .information');

        console.log(names);
        console.log(phones);
        for (let i = 0; i < names.length; i++) {
            // let name = $(names[i]).text();
            // let phone = $(phones[i]).text();
            console.log(names[i]);
            // for (let j = i + 1; j < names.length; j++) {
            if ($(names[i]).text() == name && $(phones[i]).text() == phone) {
                // $(names[j]).parent().remove();
                $(information[i]).attr('data-id', 1);
                $(information[i]).css('display', 'none');
            }
            // }
        }
    }

});