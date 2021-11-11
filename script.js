const init = () => { 
    // função pra validar email
    const validateEmail = (event) => {
        const input = event.currentTarget
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const emailTest = regex.test(input.value)

        if(!emailTest) {
            submitButton.setAttribute("disabled", "disabled")
            input.nextElementSibling.classList.add('error')
        } else {
            submitButton.removeAttribute("disabled")
            input.nextElementSibling.classList.remove('error')
        }
    }

    // validação do input de senha
    const validatePassword = (event) => {
        const input = event.currentTarget

        if(input.value.length < 8) {
            submitButton.setAttribute("disabled", "disabled")
            input.nextElementSibling.classList.add('error')
        } else {
            submitButton.removeAttribute("disabled")
            input.nextElementSibling.classList.remove('error')
        }
    }
    
    // função init que vai ser chamada quando o nosso window carregar
    // preciso selecionar meus 3 elementos: os 2 input e o botão
    const inputEmail = document.querySelector('input[type="email"]')
    const inputPassword = document.querySelector('input[type="password"]')
    const submitButton = document.querySelector('.login__submit')

    inputEmail.addEventListener('input', validateEmail)
    inputPassword.addEventListener('input', validatePassword)

    const errorHandler = () => {
        submitButton.classList.remove('success')
        submitButton.classList.add('error')
        submitButton.textContent = 'Error'
    }

    const successHandler = () => {
        submitButton.classList.remove('error')
        submitButton.classList.add('success')
        submitButton.textContent = 'Sent'
    }

    // validação pra saber se o submitButton existe quando clicar nele
    if(submitButton) {
        // adicionar um evento de click
        // e aí esse evento recebe uma função
        submitButton.addEventListener('click', (event) => {
            // prevenir qualquer comportamento default
            event.preventDefault()

            submitButton.textContent = '...Loading'

            fetch('https://reqres.in/api/login', {
                // método
                method: 'POST', 
                // vai informar o tipo de arquivo que estamos enviando
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: inputEmail.value,
                    password: inputPassword.value,
                })
            }).then((response) => {
                if (response.status !== 200) {
                    return errorHandler()
                }

                successHandler()

            }).catch(() => { //catch vai pegar qqr erro que exista na nossa requisição
                errorHandler()
            })  
        })
    }
}

window.onload = init    // eu quero que ele carregue minha init
