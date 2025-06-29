from config import LlamaGGUFConfig
from agent_core.llma import LlamaGGUFModel
from langchain.agents import initialize_agent
from agent_core.tools import query_tool, summarize_tool
from langchain.llms import GPT4All as LangChainGPT4All


class LangChainAgentFactory:
    """LANGCHAIN АГЕНТ НА ЛОКАЛЬНОЙ META"""

    def __init__(self, config: LlamaGGUFConfig = None):
        self.config = config or LlamaGGUFConfig()
        self.model_wrapper = LlamaGGUFModel(self.config)

    # Инициализация
    def build_agent(self):
        langchain_llm = LangChainGPT4All(
            model=self.config.full_path,
            verbose=self.config.verbose,
            allow_download=False)

        agent = initialize_agent(
            tools=[query_tool, summarize_tool],
            llm=langchain_llm,
            agent="zero-shot-react-description",
            verbose=True)
        return agent
