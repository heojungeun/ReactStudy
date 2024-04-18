for(var i=0; i<5;i++){
    setTimeout(function () {
        console.log("inner", i);
    }, i * 1000)
    console.log("outer", i);
}