function getlength(number) {
    return number.toString().length;
}
function roundNumber(number, decimals) {
    var newnumber = Number(number+'').toFixed(parseInt(decimals));
    return parseFloat(newnumber);
}
var counter = {
    actions: {
        get_short: function(number){
            var answer = Number(number).toLocaleString().split(",");
            var first = answer[0];
            var second = answer[1];
            var digits = getlength(Math.floor(number));
            if(digits <= 3){
                var final_answer = number;
            }else{
                var final_answer = roundNumber(first + '.' + second, 1);
            }
            return final_answer.toFixed(1);
        },
        get_end: function(el, number){
            var digits = getlength(Math.floor(number));
            if(digits <= 6){
                return counter.build.label(el, 'K');
            }else if(digits <= 9 && digits > 6){
                return counter.build.label(el, 'M');
            }else{
                return counter.build.label(el, 'B');
            }
        }
    },
    results: function(el, number){
        var element = $('#' + el),
            answer = counter.actions.get_short(number),
            digits = getlength(Math.floor(number)),
            el_height = 0,
            last_call = answer.toString().split('.'),
            last_last = last_call[0].split(""),
            last_last_len = (last_last.toString().length - 1);
        element.html('');
        counter.build.block(el,5,0);
        el_height = $('.number').height();
        element.find('.number_0').find('.number_inner').animate({
            top: ("-" + (last_last[0] * el_height) + "px")
        }, 500, function() {
            // Animation complete.
        });
        if(last_last_len > 1){
            element.find('.number_1').find('.number_inner').animate({
                top: ("-" + (last_last[1] * el_height) + "px")
            }, 500, function() {
                // Animation complete.
            });
            if(last_last_len > 2){
                element.find('.number_2').show().find('.number_inner').animate({
                    top: ("-" + (last_last[2] * el_height) + "px")
                }, 500, function() {
                    // Animation complete.
                });
            }else{
                element.find('.number_2').hide();
                element.find('.number_1').css('border-right', 0);
            }
        }else{
            element.find('.number_1').hide();
            element.find('.number_2').hide();
        }
        if(digits > 3){
            element.find('.number_3').show().find('.number_inner').animate({
                top: ("-" + (element.find('.number_3').find('.dot').index() * el_height) + "px")
            }, 500, function() {
                // Animation complete.
            });
            element.find('.number_4').show().find('.number_inner').animate({
                top: ("-" + (last_call[1] * el_height) + "px")
            }, 500, function() {
                // Animation complete.
            });
            element.append(counter.actions.get_end(el, number));
        }else{
            element.find('.number_3').hide();
            element.find('.number_4').hide();
            element.find('.number_2').css('border-right', 0);
        }
    },
    build: {
        block: function(el, how_many, start_number){
            for (var i = start_number; i< how_many; i++){
                var num_template = '';
                num_template += '<div class="number number_' + i + '">';
                num_template += '<div class="number_inner">';
                num_template += '<span>0</span>';
                num_template += '<span>1</span>';
                num_template += '<span>2</span>';
                num_template += '<span>3</span>';
                num_template += '<span>4</span>';
                num_template += '<span>5</span>';
                num_template += '<span>6</span>';
                num_template += '<span>7</span>';
                num_template += '<span>8</span>';
                num_template += '<span>9</span>';
                num_template += '<span class="dot">.</span>';
                num_template += '<span>k</span>';
                num_template += '</div>';
                num_template += '</div>';
                $('#' + el).append(num_template);
            }
        },
        label: function(el, label){
            var label_template = '';
            label_template += '<div class="number number_label">';
            label_template += '<div class="number_label_inner">';
            label_template += '<span>'+label+'</span>';
            label_template += '</div>';
            label_template += '</div>';
            $('#' + el).append(label_template);
        }
    }
};
$(document).ready(function(){
	counter.results('result_total_views', $('#result_total_views').text());
	counter.results('result_country_views', $('#result_country_views').text());
});