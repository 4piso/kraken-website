$('#document').ready(function(){
    $('#datepicker').datepicker();
    $('#timepicker').timepicker({
        timeFormat: 'h:mm p',
        interval: 60,
        minTime: '10',
        maxTime: '3:00pm',
        defaultTime: '9',
        startTime: '90:00',
        dynamic: false,
        dropdown: true,
        scrollbar: true
    });
});
