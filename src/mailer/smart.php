<?php 

$data = json_decode(file_get_contents("php://input"), true);

if (json_last_error() === JSON_ERROR_NONE) {
	$name = $data['name'];
	$phone = $data['phone'];
	$email = $data['email'];
	$message = $data['message'];

	require_once('phpmailer/PHPMailerAutoload.php');
	$mail = new PHPMailer;
	$mail->CharSet = 'utf-8';

	// $mail->SMTPDebug = 3;                               // Enable verbose debug output

	$mail->isSMTP();                                      // Set mailer to use SMTP
	$mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
	$mail->SMTPAuth = true;                               // Enable SMTP authentication
	$mail->Username = '';                 // Наш логин
	$mail->Password = '';                           // Наш пароль от ящика
	$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
	$mail->Port = 465;                                    // TCP port to connect to
	
	$mail->setFrom('', 'My_web_page');   // От кого письмо 
	$mail->addAddress('');     // Add a recipient
	//$mail->addAddress('ellen@example.com');               // Name is optional
	//$mail->addReplyTo('info@example.com', 'Information');
	//$mail->addCC('cc@example.com');
	//$mail->addBCC('bcc@example.com');
	//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
	//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
	$mail->isHTML(true);                                  // Set email format to HTML

	$mail->Subject = 'Данные из формы сайта-портфолио';
	$mail->Body    = '
			Пользователь оставил данные <br> 
		Имя: ' . $name . ' <br>
		Номер телефона: ' . $phone . '<br>
		E-mail: ' . $email . '<br>
		Message: ' . $message . '';

	if(!$mail->send()) {
		return false;
	} else {
		return true;
	}
} else {
	echo 'Ошибка декодирования JSON: ' . json_last_error_msg();
	return false;
}

?>