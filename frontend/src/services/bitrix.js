// Bitrix24 CRM Integration Service

class BitrixService {
  constructor() {
    // URL портала Битрикс24
    this.portalUrl = "https://b24-bvtv4z.bitrix24.ru";
    // Webhook URL из настроек (НОВЫЙ вебхук)
    this.webhookUrl =
      "https://b24-bvtv4z.bitrix24.ru/rest/1/bal8wrv83oix1jg9/crm.lead.add";
  }

  async sendLead(leadData) {
    try {
      console.log("📤 Отправка лида в Битрикс24:", leadData);

      // Формируем параметры для GET запроса
      const params = new URLSearchParams({
        "fields[TITLE]": leadData.title,
        "fields[NAME]": leadData.name,
        "fields[PHONE][0][VALUE]": leadData.phone,
        "fields[PHONE][0][VALUE_TYPE]": "WORK",
        "fields[EMAIL][0][VALUE]": leadData.email,
        "fields[EMAIL][0][VALUE_TYPE]": "WORK",
        "fields[COMMENTS]": leadData.comments,
        "fields[SOURCE_ID]": "WEB",
        "fields[SOURCE_DESCRIPTION]": leadData.source || "Сайт недвижимости",
      });

      // Отправляем GET запрос (Битрикс24 REST API поддерживает GET)
      const response = await fetch(`${this.webhookUrl}?${params.toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("✅ Лид успешно создан в Битрикс24:", result);

      return {
        success: true,
        leadId: result.result,
        data: result,
      };
    } catch (error) {
      console.error("❌ Ошибка отправки в Битрикс24:", error);

      return {
        success: false,
        error: error.message,
        details: error,
      };
    }
  }

  // Форматирование комментария с информацией о недвижимости
  formatComment(formData) {
    let comment = "";

    if (formData.message) {
      comment += `Сообщение клиента: ${formData.message}\n\n`;
    }

    comment += "--- ИНФОРМАЦИЯ ОБ ОБЪЕКТЕ ---\n";
    comment += `Объект: ${formData.propertyName}\n`;
    comment += `Цена: ${formData.propertyPrice}\n`;
    comment += `Застройщик: ${formData.propertyDeveloper}\n`;
    comment += `Проект: ${formData.propertyProject}\n`;
    comment += `Источник: ${formData.source}\n`;
    comment += `Время заявки: ${formData.timestamp}`;

    return comment;
  }
}

export default new BitrixService();
