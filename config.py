import os
import torch
from pathlib import Path

BASE_DIR = os.path.dirname(os.path.abspath("."))


class PathConfig:
    """КОНФИГУРАЦИЯ ПУТЕЙ"""

    def __init__(self):
        self.data_text_dir = "./data/text"
        self.data_speech_dir = "./data/speech"
        self.llama_model_path = "./models/meta_llama"
        self.whisper_model_path = "./models/whisper/medium.pt"

        os.makedirs(self.data_text_dir, exist_ok=True)
        os.makedirs(self.data_speech_dir, exist_ok=True)
        os.makedirs(self.llama_model_path, exist_ok=True)
        os.makedirs(os.path.dirname(self.whisper_model_path), exist_ok=True)


class BDConfig:
    """КОНФИГУРАЦИЯ ПАРАМЕТРОВ ПОДКЛЮЧЕНИЯ"""

    def __init__(self):
        self.test_raw = "./data/association.csv"
        self.train_raw = "./data/other_dev.csv"
        self.output_csv = "./data/server.csv"

        self.db_user = "root"
        self.db_password = "root"
        self.db_host = "176.113.83.14"
        self.db_port = 5432
        self.db_name = "ai_data"

        self.post_url = "http://176.113.83.14:3000/ml-result"

        Path(self.test_raw).parent.mkdir(parents=True, exist_ok=True)
        Path(self.train_raw).parent.mkdir(parents=True, exist_ok=True)
        Path(self.output_csv).parent.mkdir(parents=True, exist_ok=True)


class CUDAConfig:
    """КОНФИГУРАЦИЯ ДЛЯ CUDA"""

    def __init__(self):
        self.cuda_settings = {
            "CUDA_AUTO_BOOST": "1",
            "CUDA_MODULE_LOADING": "LAZY",
            "CUDA_FORCE_PRELOAD_LIBRARIES": "1",
            "CUDA_DEVICE_MAX_CONNECTIONS": "32",
            "CUDA_CACHE_MAXSIZE": "12884901888",
            "PYTORCH_CUDA_ALLOC_CONF": "expandable_segments:True",
        }
        self.apply_cuda_settings()

    def apply_cuda_settings(self):
        for key, value in self.cuda_settings.items():
            os.environ[key] = value


class AudioConfig:
    """КОНФИГУРАЦИЯ ЗАПИСИ"""

    def __init__(self):
        self.sample_rate = 48000
        self.channels = 1
        self.chunk_duration = 0.5
        self.chunk_samples = int(self.sample_rate * self.chunk_duration)
        self.silence_threshold = 0.01
        self.silence_limit = 1.5  # лимит тишини => обрезка дорожки (в секкундах)
        self.max_duration = 30  # максимальное время записи (в секкундах)


class WhisperConfig:
    """КОНФИГУРАЦИЯ ДЛЯ WHISPER"""

    def __init__(self):
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        self.fp16 = self.device == "cuda"
        self.available_languages = ["ru", "en"]
        self.target_language = "ru"


class UVRConfig:
    """КОНФИГУРАЦИЯ ДЛЯ UVR"""

    def __init__(self):
        self.model_path = "./models/mdx_net/UVR-MDX-NET-Inst_HQ_4.onnx"
        self.metadata_path = "./models/mdx_net/model_data/model_data.json"
        self.mapper_path = "./models/mdx_net/model_data/model_name_mapper.json"

        os.makedirs(os.path.dirname(self.model_path), exist_ok=True)
        os.makedirs(os.path.dirname(self.metadata_path), exist_ok=True)


class LlamaGGUFConfig:
    """КОНФИГУРАЦИЯ ДЛЯ ЛОКАЛЬНОЙ GGUF МОДЕЛИ"""

    def __init__(
            self,
            model_name: str = "Meta-Llama-3-8B-Instruct.Q4_0.gguf",
            # DeepSeek-R1-Distill-Qwen-14B-Q4_0 - альтер. модель
            model_path: str = "./models/meta_llama",
            context_size: int = 8192,
            verbose: bool = False,
            device: str = "cuda",

            max_tokens: int = 300,
            temp: float = 0.7,
            top_k: int = 40,
            top_p: float = 0.4,
            min_p: float = 0.0,
            repeat_penalty: float = 1.18,
            repeat_last_n: int = 64,
            n_batch: int = 8,
            n_predict: int | None = None,  # можно через max_tokens
            streaming: bool = False
    ):
        self.model_name = model_name
        self.model_path = model_path
        self.context_size = context_size
        self.verbose = verbose

        self.max_tokens = max_tokens
        self.temp = temp
        self.top_k = top_k
        self.top_p = top_p
        self.min_p = min_p
        self.repeat_penalty = repeat_penalty
        self.repeat_last_n = repeat_last_n
        self.n_batch = n_batch
        self.n_predict = n_predict if n_predict is not None else max_tokens
        self.streaming = streaming
        self.device = device

        base_dir = Path(__file__).resolve().parent
        self.full_path: str = str(base_dir.parent / "models" / "meta_llama" / self.model_name)


class TTSConfig:
    """КОНФИГУРАЦИЯ TSS МОДЕЛИ ДЛЯ СИНТЕЗА"""

    language: str = "ru"
    sample_rate: int = 24000
    output_dir: Path = Path("data/speech")
    speaker_wav: str = "data/voice_sample/sample(EvaElfie).wav"  # образец аудио
    device: str = "cuda"
    model_name: str = "tts_models/multilingual/multi-dataset/xtts_v2"
