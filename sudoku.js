$(document).ready(function() {

	//создание поля
	$("#field").append("<div class='square' id='square1'>");
	for (var i = 1; i < 4; i++) {
		for (var j = 1; j < 4; j++) {
			$("#square1").append("<input type='text' maxlength=1 class='number' id='number"+i+"-"+j+"'>");
		}
	}
	$("#field").append("</div");

	$("#field").append("<div class='square' id='square2'>");
	for (var i = 1; i < 4; i++) {
		for (var j = 4; j < 7; j++) {
			$("#square2").append("<input type='text' maxlength=1 class='number' id='number"+i+"-"+j+"'>");
		}
	}
	$("#field").append("</div");

	$("#field").append("<div class='square' id='square3'>");
	for (var i = 1; i < 4; i++) {
		for (var j = 7; j < 10; j++) {
			$("#square3").append("<input type='text' maxlength=1 class='number' id='number"+i+"-"+j+"'>");
		}
	}
	$("#field").append("</div");

	$("#field").append("<div class='square' id='square4'>");
	for (var i = 4; i < 7; i++) {
		for (var j = 1; j < 4; j++) {
			$("#square4").append("<input type='text' maxlength=1 class='number' id='number"+i+"-"+j+"'>");
		}
	}
	$("#field").append("</div");

	$("#field").append("<div class='square' id='square5'>");
	for (var i = 4; i < 7; i++) {
		for (var j = 4; j < 7; j++) {
			$("#square5").append("<input type='text' maxlength=1 class='number' id='number"+i+"-"+j+"'>");
		}
	}
	$("#field").append("</div");

	$("#field").append("<div class='square' id='square6'>");
	for (var i = 4; i < 7; i++) {
		for (var j = 7; j < 10; j++) {
			$("#square6").append("<input type='text' maxlength=1 class='number' id='number"+i+"-"+j+"'>");
		}
	}
	$("#field").append("</div");

	$("#field").append("<div class='square' id='square7'>");
	for (var i = 7; i < 10; i++) {
		for (var j = 1; j < 4; j++) {
			$("#square7").append("<input type='text' maxlength=1 class='number' id='number"+i+"-"+j+"'>");
		}
	}
	$("#field").append("</div");

	$("#field").append("<div class='square' id='square8'>");
	for (var i = 7; i < 10; i++) {
		for (var j = 4; j < 7; j++) {
			$("#square8").append("<input type='text' maxlength=1 class='number' id='number"+i+"-"+j+"'>");
		}
	}
	$("#field").append("</div");

	$("#field").append("<div class='square' id='square9'>");
	for (var i = 7; i < 10; i++) {
		for (var j = 7; j < 10; j++) {
			$("#square9").append("<input type='text' maxlength=1 class='number' id='number"+i+"-"+j+"'>");
		}
	}
	$("#field").append("</div");

	//проверка на ввод только цифр
	$(".number ").keypress(function(e) {
		if (e.which != 8 && e.which != 0 && e.which != 46 && (e.which <49 || e.which > 58)) {
		return false;
		}
	});

	//ajax запрос к файлу "sudoku.json"
	$.ajax({
		url : "sudoku.json",
		dataType : 'json',
		success : function(data) {
			//перебираем массив numbers из файла и присваиваем соответствующим полям ввода значения, также убираем у них возможность редактирования
			_.each(data.numbers, function(number) {
				$("#number"+number.i+"-"+number.j).val(number.value).attr("disabled", true);
			});
		}
	});

	//обработчик события "blur"
	$(".number").on("blur", function() {
		//если пользователь что-то ввел
		if (this.value != "") {
			//если это не число, убираем значение
			if (!/\d/.test(this.value)) {
				this.value="";
				return;
			}
			//определяем позицию поля ввода
			var pos = this.id.replace("number", "").split("-");
			//значение поля
			var value = this.value;
			//id поля
			var id = this.id;

			var j = 1;
			var i = 1;

			//проверяем не повторяется ли цифра в строках и столбцах
			while (j < 10 && i < 10) {
				if (($("#number"+pos[0]+"-"+j).val() == value && j != pos[1]) || ($("#number"+i+"-"+pos[1]).val() == value) && i != pos[0]) {
					this.value="";
					alert("Неверно!");
					return;
				}
				j++;
				i++;
			}

			//проверяем не повторяется ли строка в квадрате
			$(this).parent().children('input').each(function() {
				if (this.value == value && this.id != id) {
					$("#"+id).val("");
					alert("Неверно!");
				}
			});

			//переменная для определения победы
			var victory = true;

			//перебираем все поля ввода
			$("#field input").each(function() {
				//если в каком-либо поле есть пустое значение, присваиваем false
				if ($(this).val() == "") {
					victory = false;
				}
			});

			//если false не было присвоено, значит игра пройдена
			if (victory) {
				alert("Поздравляем!Вы выйграли!");
			}
		}
	})

});
