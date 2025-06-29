# **Domli-ML-**  
<p style="text-align: center;">На этой ветке лежит ml-часть проекта. В настоящее время она находится на стадии альфа-версии, поэтому функциональность и производительность могут существенно измениться по мере разработки.

Тут польный ml-конвейер, работающий на базе лама-моделей. `Главная фича` - ии-агент для выступающий в качестве менеждера по продажам АССК, он отвечает за всё сопровождение клиента по сайту. Система легко обрабатывает аудио в режиме реального времени: преобразует речь в текст, интерпретирует запросы с помощью языковой модели, оборабатывает запросы, синтезирует ответы обратно в речь и помогает в навигации на сайте. Также в пакете `tools` реализованы функции, благодаря ктором он может обращаться к БД и выдвать оттуда объекты недвижисоти с учетом запросов пользовтеля. Модели дообучены на данных застройщика, есть информация по компаних, их объектам и характристиках. 
</p>

---

### **Преимущества**
- Понимание языка: архитектура построена на базе моделей LLaMA, что позволяет ей глубоко понимать контекст диалогов и естественно общаться с пользователем.
- Память: все диалоги автоматически сохраняются, что позволяет ии отследивать констекст.
- Гибкость: чистая и модульная архитектура позволяет быстро добавлять новые функции в пайплайн ии-агента.
- Актульаность данных: встроен парсер объявлений с Avito и сайтов застройщиков, система собирает данные по таймеру.
- Мульти-язычность: Whisper умеет режиме реального времени анализировать язык пользователя.

---

### **Pipeline Overview**
1. **Speech-to-Text Processing:**
   - Input is recorded with a silence-based timer to trim pauses and capture only relevant speech.
   - `UVR-MDX-NET-Inst_HQ_4` performs voice isolation, spectrogram sampling, and upscaling for cleaner signal quality.
   - `Whisper-medium-v3 ` transcribes the processed audio into accurate multilingual text.

2. **Text Generation Inference:**
   - Transcribed text is passed to a selected LLaMA, to choose from
     - `DeepSeek-R1-Distill-Qwen-14B-Q4_0` for quality;
     - `Meta-Llama-3-8B-Instruct.Q4_0` for speed.
   - Output is optimized for clarity, factuality, and smooth spoken delivery.

3. **Prompt Engineering and Dialogue Management:**
   - A dedicated prompt builder sets assistant role, tone, and reply constraints.
   - Injects cultural context and location-based relevance into each response.
   - An example of a real dialogue:
```
| User_input|
|--------------------------|
| Привет! Ты знаешь что-нибудь об озере Сукко? Расскажи о нём поподробнее.|

| Assistant_output|
|--------------------------|
| Да, я знаю озеро Сукко! Это уникальное место в Краснодарском крае. Это большое озеро на юге региона, окруженное кипарисовой рощей...|
```

4. **Voice Synthesis:**
- `XTTS-v2-multi` generates natural multilingual speech with realistic intonation and prosody.
- Clone any voice from a 3-5s sample and speak in any language using that voice.

---

### **Technologies**
- PyTorch: enabling efficient training and inference, particularly for language understanding and generation.
- gpt4all: for fine-tuning responses, providing highly coherent and context-aware text generation.
- TTS: generalizes across accents and tones, enabling high-quality, expressive speech.
- Onnxruntime: optimizes model performance for cross-platform deployment.

---

### Структура проекта

```
domli/
│
│
├── config.py 			   # Настройки конфигурации
├── fast_api.bash                  # Скрипт для запуска FastApi
├── main.py                        # Главный скрипт
│
│
├── chromedriver/                  # Драйвер браузера для парсинга
│
│
│
├── db_connector/              	   # === БД PostgreSQL ===
│   ├── __init__.py
│   ├── engine.py 		   # Получение / возврат соединений
│   ├── extractor.py 		   # SQL запросы + таблицы
│   └── writer.py 	   	   # Отправка результата на сервер
│
│
│
├── audio_processing/              # === Процессинг аудио (speech to speech pipline) ===
│   ├── __init__.py
│   ├── to_audio.py 		   # Синтез голосового ответа
│   ├── to_text.py 		   # Транскрибирование
│   └── vocal_selector.py 	   # Предобработка голоса
│
│
│
├── agent_core/                    # === Логика агента ===
│   ├── __init__.py
│   ├── factory.py 		   # Инициализация
│   ├── llma.py 		   # Обёртка над gpt4all
│   ├── run_agent.py 		   # Запуск агента
│   └── tools.py 	           # Системные инструменты
│
│
│
├── llama_agent/                   # === Пайпайлн ассистента ===
│   ├── __init__.py
│   ├── dialog_manager.py 	   # Отслеживает шаги, обновляет историю, координирует элементы
│   ├── llama_response.py 	   # Класс llama-модели + контекст
│   └── prompt_engineer.py 	   # Систменые промты
│
│
│
├── models/                        # === Файлы моделей, их параметры и логи ===
│   │    		   
│   ├── whisper 		   # Голос (вход) в текст		   
│   ├── mdx_net 		   # Нормализация и очистка аудио
│   ├── tts_multi 		   # Текст (выход) в речь
│   └── meta_llama 		   # Дистилированные llama
│
│
│
├── scraping/                      # === Веб-скрейпинг ===
│   ├── __init__.py
│   ├── scr_config.py 		   # Настройки конфигурации
│   ├── scr_base.py 		   # Для сайтов застройщиков
│   ├── scr_net.py 		   # Для авито
│   └── scheduler_run.py 	   # Планировщик и обновления
│
│
│
├── data/                          # === Данные проекта ===
│   │
│   ├── company/ 		   # Профили застройщиков
│   ├── real_estate/ 		   # Объекты недвижимости
│   ├── speech/ 		   # Голосовые вход/выход
│   ├── text/ 			   # История чата
│   └── voices/ 		   # Образец голоса
│
│
│
├── requirements.txt
├── structure.txt
│
│
├── .gitattributes
└── README.md
```
---
