

let animate = (el, animation) => {
    return new Promise((resolve) => {
        const onAnimationEndCb = () => {
            el.removeEventListener("animationend", onAnimationEndCb);
            resolve();
        };
        el.addEventListener("animationend", onAnimationEndCb);
        el["style"].animation = animation;
    });
};

const colorful = function (el) {
    this.el = el;
    this.containerEl = null;

    this.colorFrequency = 3;
    this.colorColors = ['#EF2964', '#00C09D', '#2D87B0', '#48485E', '#EFFF1D'];
    this.colorAnimations = ['slow', 'medium', 'fast'];

    this._setupElements();
    this._rendercolor();
};

const stopcolor = () => document.querySelectorAll('.color-container').forEach(async i => {

    animate(i, 'fadeOut .2s').then(x => i.remove())

});

colorful.prototype._setupElements = function () {
    const containerEl = document.createElement('div');
    const elPosition = this.el.style.position;

    if (elPosition !== 'relative' || elPosition !== 'absolute') {
        this.el.style.position = 'relative';
    }

    containerEl.classList.add('color-container');

    this.el.appendChild(containerEl);

    this.containerEl = containerEl;
};

colorful.prototype._rendercolor = function () {
    this.colorInterval = setInterval(() => {
        const colorEl = document.createElement('div');
        const colorSize = (Math.floor(Math.random() * 3) + 7) + 'px';
        const colorBackground = this.colorColors[Math.floor(Math.random() * this.colorColors.length)];
        const colorLeft = (Math.floor(Math.random() * this.el.offsetWidth)) + 'px';
        const colorAnimation = this.colorAnimations[Math.floor(Math.random() * this.colorAnimations.length)];

        colorEl.classList.add('color', 'color--animation-' + colorAnimation);
        colorEl.style.left = colorLeft;
        colorEl.style.width = colorSize;
        colorEl.style.height = colorSize;
        colorEl.style.backgroundColor = colorBackground;

        colorEl.removeTimeout = setTimeout(function () {
            colorEl.parentNode.removeChild(colorEl);
        }, 3000);

        this.containerEl.appendChild(colorEl);
    }, 25);
};

const congrat = {
    play: () => new colorful(document.body),
    stop: () => stopcolor()
}

let essais = 0
let erreurs = 0

window.onload = async () => {

    typeof ons === 'undefined' && (window.ons = {
        notification: {
            alert: alert
        },
        platform: {
            select: s => () => { }
        }
    })
    let setButtonLabel = i => document.querySelector('.go').innerHTML = i;
    let setButtonBG = i => document.querySelector('.go').style.background = i;
    let setButtonBorder = i => document.querySelector('.go').style.border = i;

    let setButtonActivity = i => { 
        document.querySelector(".go").removeEventListener("click", setButtonLabel, false);
        document.querySelector(".go").onclick = i
    }

    let animate = (el, animation) => {
        return new Promise((resolve) => {
            const onAnimationEndCb = () => {
                el.removeEventListener("animationend", onAnimationEndCb);
                resolve();
            };
            el.addEventListener("animationend", onAnimationEndCb);
            el["style"].animation = animation;
        });
    };

    let css = (e, s, v) => e['style'][s] = v;

    let tableCtnt = document.querySelector('.table-content');

    AOS.init();

    ons.platform.select('ios');

    if (!localStorage.getItem('learn:date:data')) {
        await ons.notification.alert('Pas de données précédemment sauvgardés ont été trouvés. Créer Maintenant?');
        location.href = '/date'
    }

    function isArabic(string) {
        let def = 0;
        let ar = 0;

        string.split('').forEach(i => /[\u0600-\u06FF]/.test(i) ? (ar++) : (def++))

        return ar >= def
    }

    function addRemoveListener(el, ev, callbackFunction) {
        el.removeEventListener('click', callbackFunction)
        el.addEventListener('click', callbackFunction)
    }

    /**
     * @type <string[]> data
     */
    let data = JSON.parse(localStorage.getItem('learn:date:data')).fields;

    // preload Audio :

    function LoadAudio(src) {
        return new Promise((resolve, reject) => {
            const audio = new Audio();
            audio.src = src;
            resolve(audio);
        });
    }

    let AudioData;
    try {
        AudioData = await fetch("https://speakapi.varchardev.repl.co/api/voice-list", {
            method: "POST",
            body: JSON.stringify({
                list: data.map(t => t.question.trim())
            }),
            headers: {
                "content-type": "application/json",
            },
        }).then(i => i.json());
    } catch { }

    let actionButton = document.querySelector('.go');
    let started = false;

    function uuid() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }

    const refreshListeners = () => {
        // document.querySelectorAll('.table-row').forEach(i => addRemoveListener(i, 'long-press', async () => {
        //     let res = await ons.notification.confirm('Vous étes sur de vouloir sauter cette question?');

        //     if (res) {
        //         let currentBox = i;

        //         let inputBox = currentBox.querySelector('input');

        //         let questionID = currentBox.getAttribute('data-uuid');

        //         let targetQuestion = data.find(i => i.uuid === questionID);

        //         let { response } = targetQuestion;

        //         inputBox.value = response;

        //         document.querySelector('.go').click();
        //     }
        // }))
    }

    data.forEach(i => {

        let q = i.question;
        let a = i.response;
        let uid = i.uuid;

        tableCtnt.insertAdjacentHTML('beforeend', `
            <div class="table-row" data-uuid="${uid}" data-long-press-delay="500">
                <div class="table-data">${q.replace(/[(?|!|؟)=]/g, '')} ${isArabic(q) ? '؟' : "?"}</div>
                    <div class="table-data">
                        <input type="text" placeholder="Réponse">
                    </div>
                    <div class="table-data">
                        <img src="/assets/loading.gif" alt="Waiting..." srcset="" width="30">
                    </div>
                </div>
            </div>
        `);
    });

    refreshListeners();

    let currentIndex = 0;

    let FirstTime = true;

    let currentBox = null

    function finish() {
        setButtonLabel('<i class="fas fa-list-check"></i> &nbsp; Voir les résultats')
    
        setButtonBG('linear-gradient(180deg, rgb(29, 116, 255), rgb(72, 163, 255))');
        setButtonBorder('1px solid rgb(0, 106, 255)')

        setButtonActivity(results)
    }

    async function results() {
        await ons.notification.alert('You finished the test... Accurancy Rate was: ' + (((essais - erreurs) / essais * 100) || 0) + '% !')
        location.reload();
    }

    actionButton.addEventListener('click', async () => {
        if (!started) {
            started = true;

            setButtonLabel(`<img src="/assets/loading.gif" style="filter: brightness(160%);" alt="Loading..." width="16"></img>`)

            await animate(tableCtnt.querySelector(':first-child'), 'unblur .5s forwards');
            tableCtnt.querySelector(':first-child').querySelector('input').focus();

            setButtonLabel('<i class="fas fa-check"></i> &nbsp;Check & Continue')

            // setButtonBG('linear-gradient(180deg, rgb(29, 116, 255), rgb(72, 163, 255)')
            setButtonBG('linear-gradient(180deg, #2ac944, #56d46b)');
            setButtonBorder('1px solid #309f44');
        }

        currentBox = document.querySelector(`.table-row:nth-child(${currentIndex + 1}`);

        if (!currentBox) {

            return finish();
        }

        animate(currentBox, 'unblur .5s forwards');

        let inputBox = currentBox.querySelector('input');

        inputBox.focus();

        let input = inputBox.value.trim();

        let questionID = currentBox.getAttribute('data-uuid');

        let targetQuestion = data.find(i => i.uuid === questionID);

        let { response } = targetQuestion;

        let name = currentBox.querySelector('.table-data').innerHTML;
        let audioURL = AudioData[name.replace(/[(?|!|؟)]/g, '').trim()]

        if (FirstTime) {
            new Audio(audioURL).play();
            FirstTime = false
        } else {

            if (input === '') {
                await ons.notification.alert('Le remplissage du champ de la réponse est obligatoire.')
                return currentBox.querySelector('input').focus();
            } else if (input === '?') {
                let res = await ons.notification.confirm('Vous étes sur de vouloir sauter cette question?');

                if (res) {

                    if (!currentBox) {

                        return finish();
                    }

                    currentBox.querySelector('input').value = response;

                    currentBox.querySelector('img').src = '/assets/check.png'
                    congrat.play();
                    setTimeout(() => {
                        congrat.stop();
                    }, 2000)

                    currentIndex++
                    
                    var currentBox = document.querySelector(`.table-row:nth-child(${currentIndex + 1}`);

                    if (!currentBox) return finish();

                    currentBox.querySelector('input').focus();
            
                     input = currentBox.querySelector('input').value.trim();
            
                     questionID = currentBox.getAttribute('data-uuid');
            
                     targetQuestion = data.find(i => i.uuid === questionID);
            
                     response = targetQuestion.response;
            
                     name = currentBox.querySelector('.table-data').innerHTML;
                     audioURL = AudioData[name.replace(/[(?|!|؟)]/g, '').trim()]

                     currentIndex --
                }
            } else {

                essais++;

                if (response === input) {
                    currentBox.querySelector('img').src = '/assets/check.png'
                    congrat.play();
                    setTimeout(() => {
                        congrat.stop();
                    }, 2000)

                    currentIndex++
                    
                    var currentBox = document.querySelector(`.table-row:nth-child(${currentIndex + 1}`);

                    if (!currentBox) {

                        return finish();
                    }

                    currentBox.querySelector('input').focus();
            
                     input = currentBox.querySelector('input').value.trim();
            
                     questionID = currentBox.getAttribute('data-uuid');
            
                     targetQuestion = data.find(i => i.uuid === questionID);
            
                     response = targetQuestion.response;
            
                     name = currentBox.querySelector('.table-data').innerHTML;
                     audioURL = AudioData[name.replace(/[(?|!|؟)]/g, '').trim()]

                     currentIndex --
                }
                else {
                    currentBox.querySelector('img').src = '/assets/false.png'
                    currentBox.querySelector('input').focus();
        
                    animate(document.querySelector('.container'), 'shake .3s').then(o => {
                        document.querySelector('.container').style.animation = 'none'
                    });
                    currentIndex--;

                    erreurs++;
                }
            }

            currentIndex++;
    
            if (document.querySelectorAll('.table-row').length - 1 < currentIndex) {
                setButtonLabel('<i class="fas fa-list-check"></i> &nbsp; Voir les résultats')
    
                setButtonBG('linear-gradient(180deg, rgb(29, 116, 255), rgb(72, 163, 255))');
                setButtonBorder('1px solid rgb(0, 106, 255)')
    
            } else new Audio(audioURL).play();

            currentBox = document.querySelector(`.table-row:nth-child(${currentIndex + 1}`);

            if (!currentBox) {

                return finish();
            }

            animate(currentBox, 'unblur .5s forwards');

            let inputBox = currentBox.querySelector('input');

            inputBox.focus();
        }

    });

}

window.addEventListener("keyup", e => e.key == 'Enter' && document.querySelectorAll('ons-alert-dialog').length <= 0 && document.querySelector('.go').click())

let ham = document.querySelector('.ham');

ham.addEventListener('click', () => {
    ons.notification.alert('Coming Soon...')
});
