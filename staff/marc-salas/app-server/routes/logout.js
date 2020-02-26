module.exports = ({ session }, res) => {
    //debugger
    session.destroy(() => res.redirect('/'))
}