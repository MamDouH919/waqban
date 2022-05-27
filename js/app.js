$(document).ready(function () {

    let winners = $('#winners'),
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
        startTime();
        title.text(' اسم ' + myArray[numWinners])
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




});