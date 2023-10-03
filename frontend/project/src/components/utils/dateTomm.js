function DateTodayTomm(day="today") {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1 < 10 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1;
    let dd = day==="today" ? today.getDate() : today.getDate() + 1; 
    dd = dd < 10 ? '0' + dd : dd ;
    let dateToday = `${yyyy}-${mm}-${dd}`;
    return dateToday;
}

export {DateTodayTomm};