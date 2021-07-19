import React, { useState } from 'react';
import { fetchIncludedWords, fetchMatchedWord } from './apis/WordApi';


function App() {
  const [keyword, setKeyword] = useState("");
  const [alertText, setAlertText] = useState("");
  const [matchedWord, setMatchedWord] = useState<{
    name: string, description: string, category: string,
    synonym: string,
    code_example: string
  }>();
  const [containedWords, setContainedWords] = useState([]);
  const [fetched, setFetched] = useState(false);
  const onClick = async (e: any) => {
    e.preventDefault();
    // 
    const inputElement: any = document.getElementById("keyword-input");
    const inputKeyword = inputElement.value;


    if (inputKeyword && inputKeyword.length > 0) {
      setFetched(false);
      setKeyword(inputKeyword);
      const response = await fetchMatchedWord(inputKeyword);
      setMatchedWord(response.fields);

      const responseWords = await fetchIncludedWords(keyword);
      console.log(responseWords.fields)
      setFetched(true);

    } else {
      setAlertText("검색할 키워드를 입력해주세요.")
    }
  }

  return (
    <main className="mt-24">
      <header className="pb-8">
        <h3 className="text-4xl font-bold text-gray-800 pb-6">개발 용어 사전</h3>
        <form onSubmit={onClick}>
          <input className="border p-2 w-60 text-xl h-10" id="keyword-input" />
          <button className="bg-yellow-200 p-2 ml-2  h-10 border">
            물음표
          </button>
        </form>
        <div className="text-red-400 text-sm">{alertText}</div>
      </header>
      {fetched ? <section>
        {matchedWord ? <article className="whitespace-pre-line text-base">
          <div className="flex">
            <h6 className="text-lg font-bold">{matchedWord.name}</h6>
            <button className="bg-yellow-200 ml-2 px-2 text-sm rounded shadow">{matchedWord.category}</button></div>
          <div>{matchedWord.description}</div>

          {/* 예제 코드 */}
          {matchedWord.code_example && <div className="bg-gray-100 border p-1">
            <code className="text-xs">{matchedWord.code_example}</code>
          </div>}

          {/* 동의어 */}
          {matchedWord.synonym &&
            <>{matchedWord.name !== keyword ?
              <div>동의어: {matchedWord.synonym}</div>
              : <div>동의어: {matchedWord.name}</div>}</>
          }

          {/* 카테고리 */}
          {/* 연관 키워드 */}
          {/* source_example */}


        </article> : <>단어가 없습니다 (ㅠ)</>}

      </section> : <>궁금한 단어를 입력해주세요</>}

    </main >
  );
}

export default App;
