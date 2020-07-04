const generatePasswordPower = (password, cb) => {
    let [f1, f2, f3, f4] = [true, true, true, true]
    const alphabets = 'abcdefghijklmnopqrstuvwxyz'
    const capitals = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const integers = '0123456789'

    if (password.length >= 6 && password.length <= 25) {
        let power = 1
        for (let i = 0; i < password.length; i++) {
            if (f1 === true && alphabets.includes(password[i])) {
                f1 = false
                power = power + 1
            } else if (f2 === true && capitals.includes(password[i])) {
                f2 = false
                power = power + 1
            } else if (f3 === true && integers.includes(password[i])) {
                power = power + 1
                f3 = false
            } else if (f4 === true && !(capitals+alphabets+integers).includes(password[i])) {
                power = power + 1
                f4 = false
            }
            if (f1 === false && f2 === false && f3 === false && f4 === false) {
                cb(power)
                break
            }
            if (i === (password.length - 1)) {
                cb(power)
            }
        }
    } else {
        cb(0)
    }
}

export default generatePasswordPower