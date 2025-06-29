import pandas as pd
from langchain.tools import Tool
from langchain_experimental.tools.python.tool import PythonAstREPLTool

# Импорт дф
df = pd.read_csv("data/real_estate/objects.csv")

# Инструмент для выполнения произвольного Python-кода
python_repl = PythonAstREPLTool(locals={"df": df})

query_tool = Tool(
    name="query_df",
    func=python_repl.run,
    description=(
        "Инструмент для фильтрации и анализа датафрейма 'df', содержащего данные о недвижимости. "
        "Используйте Python-код для доступа к DataFrame. "
        "Доступные методы: df.query(...), df[df[...]], df.describe(), df.groupby(...), df['col'].mean() и др.\n\n"
        "Примеры:\n"
        "- df.query(\"rooms == 2 & price_per_m2 <= 60000\")\n"
        "- df[df['area'] > 100]\n"
        "- df.groupby('district')['price'].mean()"
    )
)


# Инструмент для краткой статистической сводки
def summarize_df(_: str) -> str:
    summary = {
        "Число объектов": len(df),
        "Средняя цена": df["price"].mean(),
        "Медианная цена": df["price"].median(),
        "Мин. цена": df["price"].min(),
        "Макс. цена": df["price"].max(),
        "Средняя площадь": df["area"].mean(),
        "Уникальных районов": df["district"].nunique() if "district" in df.columns else "нет столбца"
    }
    return "\n".join([f"{k}: {v:.2f}" if isinstance(v, float) else f"{k}: {v}" for k, v in summary.items()])


summarize_tool = Tool(
    name="summarize_df",
    func=summarize_df,
    description=(
        "Используйте для получения краткой сводки по DataFrame df: "
        "количество объектов, средняя и медианная цена, площадь, распределение по районам и т.д."
    )
)

# Экспорт инструментов
__all__ = ["query_tool", "summarize_tool"]
