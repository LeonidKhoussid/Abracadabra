import os
from config import LlamaGGUFConfig
from agent_core.factory import LangChainAgentFactory


class RealEstateAgentApp:
    """ОРГАЗИЗАЦИЯ ЗАПУСКА АГЕНТОВ"""

    def __init__(self, input_file: str, output_file: str):
        self.input_file = input_file
        self.output_file = output_file
        self.config = LlamaGGUFConfig()
        self.agent = None

    # Анализ диалога
    def read_query(self) -> str:
        if not os.path.exists(self.input_file):
            raise FileNotFoundError(f"Файл не найден: {self.input_file}")
        with open(self.input_file, "r", encoding="utf-8") as f:
            query = f.read().strip()
        return query

    # Формирование ответа
    def write_response(self, response: str):
        os.makedirs(os.path.dirname(self.output_file), exist_ok=True)
        with open(self.output_file, "w", encoding="utf-8") as f:
            f.write(response)

    # Лог по старту
    def display_model_info(self):
        llm = self.agent.agent.llm_chain.llm
        device = getattr(llm, "device", None) or getattr(llm, "_device", None)
        print("Информация:")
        print(f"Тип агента: {type(self.agent).__name__}")
        print(f"Устройство: {device}")

    # Запуск
    def run(self):
        user_query = self.read_query()
        if not user_query:
            return

        factory = LangChainAgentFactory(self.config)
        self.agent = factory.build_agent()

        self.display_model_info()

        response = self.agent.run(user_query)
        self.write_response(response)


# from agent_core import RealEstateAgentApp
# # Запуск
# if __name__ == "__main__":
#     runner = LLMAgentRunner(
#         input_file=os.path.join("data", "text", "dialog.txt"),
#         output_file=os.path.join("data", "text", "dialog.txt"))
#     runner.run()
