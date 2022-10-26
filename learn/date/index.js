
let addButton = document.querySelector('.add');
let continueButton = document.querySelector('.go');
let boxFields = document.querySelector('.boxes');
let ham = document.querySelector('.ham');

function update() {
    document.querySelectorAll('input').forEach(i => {
        i.onclick = i.onfocus = () => {
            i.style.border = '1px solid #d6d6d6'
        }
    })
}

update();

function uuid() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

addButton.addEventListener('click', () => {
    boxFields.insertAdjacentHTML('beforeend', `
        <div class="box-hold">
            <div class="box">
            <div class="one">
                <input
                type="text"
                name="Question"
                placeholder="Date (Question)"
                />
            </div>
            <div class="two">
                <input type="text" name="Question" placeholder="Réponse" />
            </div>
        </div>

        <button class="remove">
            <i class="fas fa-close"></i>
        </button>
    </div>
    `);

    document.querySelectorAll('.remove').forEach(i => {
        i.onclick = function () {
            document.querySelectorAll('.box-hold').length > 1 && i.parentElement.remove();
        }
    })
});

window.onload = () => {

    AOS.init();

    document.querySelectorAll('.remove').forEach(i => {
        i.onclick = function () {
            document.querySelectorAll('.box-hold').length > 1 && i.parentElement.remove();
        }
    });

    ons.platform.select('ios');

    continueButton.addEventListener('click', async () => {

        // Check fields:

        let s = false;
        document.querySelectorAll('input').forEach(i => {
            if (!s && i.value.trim() === '') {
                i.style.border = '2px solid red'

                s = true;
                ons.notification.alert('Certains champs sont incomplets, veuillez les remplir pour continuer.')
            } else {
                i.style.border = '1px solid #d6d6d6'
            }
        });

        if (!s) {

            let arr = [];

            document.querySelectorAll('.box').forEach(box => {
                let arrLoc = [];

                arrLoc[0] = box.querySelector('.one input').value;
                arrLoc[1] = box.querySelector('.two input').value.trim();

                arr.push(arrLoc);
            });

            let dataObject = [];
            arr.forEach(i => {
                dataObject.push({
                    question: i[0],
                    response: i[1],
                    uuid: uuid()
                })
            })
            localStorage.setItem('learn:date:data', JSON.stringify({

                fields: dataObject
            }));

            ons.notification.alert("Redirecting to question page...");

            await new Promise(r => setTimeout(r, 2000));

            location.href += 'question';
        }
    })

    ham.addEventListener('click', () => {
        ons.notification.alert('Coming Soon...')
    });
}
