function CookieMessage(){
    return `<p>this webpage uses Cookies, Accept or get the f***k out please</p>
    <form action="/cookieMesage" method="post">
    <input type="submit" name="accept" value="Accept" >
    <input type="submit" name="discart" value="Discart" >
    </form>`
    
}
module.exports = CookieMessage