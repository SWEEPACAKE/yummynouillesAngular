<?php
// Envoyer les headers CORS en tête de réponse
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Authorization");

// Répondre aux requêtes preflight (OPTIONS)
if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$token = $_SERVER['HTTP_AUTHORIZATION'];

if (!$token) {
    header('HTTP/1.1 401 Unauthorized');
    echo json_encode(['error' => 'Token manquant']);
    exit();
}

if ($token !== "VBnAzKpOLlf5DZSNpNuXJmvg4") {
    header('HTTP/1.1 403 Forbidden');
    echo json_encode(['error' => 'Token invalide']);
    exit();
}

require_once 'vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;

// Connexion à la base de données
$database = new mysqli("192.168.56.56", "homestead", "secret", "yummynouilles");
mysqli_set_charset($database, "utf8mb4");


if($_SERVER['REQUEST_METHOD'] === 'GET') {
    $menus = $database->execute_query("SELECT * FROM liensMenu")->fetch_all(MYSQLI_ASSOC);
    $adresses = $database->execute_query("SELECT * FROM adresses")->fetch_all(MYSQLI_ASSOC);
    $articles = $database->execute_query("SELECT * FROM article")->fetch_all(MYSQLI_ASSOC);
    $postsReseauxSociaux = $database->execute_query("SELECT * FROM postsReseauxSociaux")->fetch_all(MYSQLI_ASSOC);

    $arrayFinal = array(
        "liensMenu" => $menus,
        "adresses" => $adresses,
        "articles" => $articles,
        "postsReseauxSociaux" => $postsReseauxSociaux
    );

    echo json_encode($arrayFinal);
} else if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $stmt = $database->prepare("INSERT INTO reservation (id_adresse, nb_personnes, date_resa, message) VALUES (?, ?, ?, ?)");
    $datetimeForBDD = $_POST['date_resa'] . " " . $_POST['heure_resa'] . ":00";
    $stmt->bind_param("iiss", $_POST['id_adresse'], $_POST['nb_personnes'], $datetimeForBDD, $_POST['message']);

    if($stmt->execute()) {
        $mailer = new PHPMailer();
        $mailer->CharSet = 'UTF-8';
        $mailer->Encoding = 'base64';

        // Configuration du SMTP (Comment)
        $mailer->Host = '192.168.56.56';
        $mailer->Port = 1025;
        $mailer->isHTML(true);  
        $mailer->SMTPAuth = false;
        $mailer->SMTPSecure = '';

        // Emetteur / Destinataire (À qui)
        $mailer->setFrom("no-reply@yummynouilles.com", "Yummy Nouilles");
        $mailer->addAddress("leclient@test.dev");

        $last_insert_id = $database->insert_id;
        $restaurant = $database->execute_query("SELECT * FROM adresses WHERE id = ?", array($_POST['id_adresse']))->fetch_assoc();
        
        $mailer->Subject = "Yummy Nouilles - Votre réservation n°" . $last_insert_id;
        $mailer->Body = "Nous avons bien reçu votre demande de réservation et nous avons hâte de vous accueillir ! Rappel : <ul><li>Adresse : " . $restaurant['adresseRue'] . ", " . $restaurant['adresseCPVille'] . "</li>
        <li>Date et heure : " . date("d/m/Y à H:i", strtotime($datetimeForBDD)) . "</li></ul>";
        $mailer->AltBody = "Nous avons bien reçu votre demande de réservation et nous avons hâte de vous accueillir ! Rappel : Adresse : " . $restaurant['adresseRue'] . ", " . $restaurant['adresseCPVille'] . " Date et heure : " . date("d/m/Y à H:i", strtotime($datetimeForBDD));

        $mailer->send();
        
        echo json_encode(["success" => true, "numero_reservation" => $last_insert_id]);
    } else {
        echo json_encode(["success" => false]);
    }
}