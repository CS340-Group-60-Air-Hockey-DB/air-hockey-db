export default function cap_words(str) {
    let str_arr = str.split('_')
    let phrase = ''

    str_arr.forEach(word => {
        let first_letter = word.split('')[0].toUpperCase()
        let remaining_word = word.slice(1)

        phrase = phrase + first_letter + remaining_word + ' '
    })

    return phrase
}