export default function getInputDatetime(datetime) {
    const date = new Date(datetime)

    const offset = date.getTimezoneOffset() * 60000
    const localDate = new Date(date.getTime() - offset)

    return localDate.toISOString().slice(0, 16)
}