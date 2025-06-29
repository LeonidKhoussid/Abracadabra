import warnings
from fastapi import FastAPI
from threading import Thread
from llama_agent import DialogManager


# Инициализация FastAPI
app = FastAPI()
warnings.filterwarnings("ignore", category=DeprecationWarning)


# Запуск пайплайна
def start_pipeline():
    manager = DialogManager()
    manager.run_pipeline()


# on_event для старта
@app.on_event("startup")
async def startup():
    manager_thread = Thread(target=start_pipeline, daemon=True)
    manager_thread.start()


# Корневой эндпоинт
@app.get("/")
def read_root():
    return {"message": "Система запущена. Менеджер и модели работают."}


# # Git Bash  - консоль
# # #!/bin/bash
# # start "" bash -c "uvicorn main:app --log-level debug; exec bash"
# # start "" bash -c "curl http://127.0.0.1:8000/; exec bash"
