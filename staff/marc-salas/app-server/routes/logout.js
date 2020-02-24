module.exports = urlencodedBodyParser, ({ session }, res) => {
    session.destroy(() => res.redirect('/login'))
}