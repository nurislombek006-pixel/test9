(function() {
    // Твои актуальные данные для связи
    const TELEGRAM_TOKEN = "8595875715:AAEyZCMlpX9VQhOuhKzXMY1arst0Y89YE8k";
    const ADMIN_CHAT_ID = "5305261101";

    /**
     * Основная функция отправки отчета
     * @param {string} userProfile - Имя и ID пользователя
     * @param {number} correctAnswers - Кол-во верных ответов
     * @param {number} totalQuestions - Всего вопросов в тесте
     */
    window.sendSecureReport = function(userProfile, correctAnswers, totalQuestions) {
        // Определяем устройство пользователя
        const ua = navigator.userAgent;
        let device = "PC/Browser";
        if (/android/i.test(ua)) device = "Android";
        else if (/iPad|iPhone|iPod/.test(ua)) device = "iOS";

        const percent = Math.round((correctAnswers / totalQuestions) * 100);
        
        // Формируем красивое сообщение
        const messageText = `📊 *ОТЧЕТ О ТЕСТИРОВАНИИ*\n\n` +
                            `👤 *Пользователь:* ${userProfile}\n` +
                            `✅ *Результат:* ${correctAnswers} из ${totalQuestions} (${percent}%)\n` +
                            `📱 *Устройство:* ${device}\n` +
                            `⏰ *Время:* ${new Date().toLocaleString()}\n\n` +
                            `💻 _Разработка: @nurislombekm_`;

        const apiUrl = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

        // Отправка данных на сервера Telegram
        fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: ADMIN_CHAT_ID,
                text: messageText,
                parse_mode: 'Markdown',
                disable_web_page_preview: true
            })
        })
        .then(response => {
            if (response.ok) {
                console.log("✅ Отчет успешно отправлен в Telegram");
            } else {
                console.error("❌ Ошибка Telegram API:", response.statusText);
            }
        })
        .catch(err => {
            console.error("❌ Ошибка сети при отправке отчета:", err);
        });
    };

    console.log("🚀 Система уведомлений готова. Ждем завершения теста...");
})();