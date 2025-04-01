import requests
from bs4 import BeautifulSoup
from flask import Flask, render_template, request
from datetime import datetime, timezone, timedelta

app = Flask(__name__)

@app.route("/")
def index():
  return render_template("index.html")

@app.route("/mis")
def course():
  return "<h1>資訊管理導論</h1>"

@app.route("/today")
def today():
  tz = timezone(timedelta(hours=8))
  now = datetime.now(tz)
  return render_template("today.html", datetime=str(now))

@app.route("/welcome", methods=["GET", "POST"])
def welcome():
  user = request.values.get("nick", "訪客")
  work = request.values.get("work")
  return render_template("welcome.html", name=user, work=work)
@app.route("/account", methods=["GET", "POST"])
def account():
  if request.method == "POST":
    user = request.form.get("user", "")
    pwd = request.form.get("pwd", "")
    return f"您輸入的帳號是：{user}; 您輸入的帳號是：{pwd}"
  return render_template("account.html")
@app.route("/about")
def about():
  now = datetime.now()
  return render_template("about.html", datetime=str(now))
@app.route("/read")
def read():
  try:
    collection_ref = db.collection("靜宜資管")
    docs = collection_ref.get()
    result = "".join(f"文件內容：{doc.to_dict()}<br>" for doc in docs)
    return result if result else "沒有資料"
  except Exception as e:
    return f"讀取失敗: {str(e)}"

@app.route("/movie")
def movie():
  url = "http://www.atmovies.com.tw/movie/next/"
  try:
    Data = requests.get(url)
    Data.encoding = "utf-8"
    sp = BeautifulSoup(Data.text, "html.parser")
    result = sp.select(".filmListAllX li")
    lastUpdate = sp.find("div", class_="smaller09").text[5:]

    for item in result:
      picture = item.find("img").get("src", "").strip()
      title = item.find("div", class_="filmtitle").text.strip()
      hyperlink = "http://www.atmovies.com.tw" + item.find("div", class_="filmtitle").find("a").get("href", "")
      showInfo = item.find("div", class_="runtime").text.replace("上映日期：", "").replace("片長：", "").replace(
        "分", "").strip()
      showDate, showLength = showInfo[:10], showInfo[13:] if len(showInfo) > 13 else "N/A"

      doc = {
        "title": title,
        "picture": picture,
        "hyperlink": hyperlink,
        "showDate": showDate,
        "showLength": showLength,
        "lastUpdate": lastUpdate
      }

      movie_id = hyperlink.split("/")[-2]
      db.collection("電影").document(movie_id).set(doc)

    return f"近期上映電影已更新，網站最近更新日期為：{lastUpdate}"
  except requests.RequestException as e:
    return f"電影爬蟲失敗: {str(e)}"
  except Exception as e:
    return f"資料儲存失敗: {str(e)}"

@app.route("/search", methods=["POST", "GET"])
def search():
  if request.method == "POST":
    MovieTitle = request.form.get("MovieTitle", "")
    info = ""
    try:
      collection_ref = db.collection("電影")
      docs = collection_ref.order_by("showDate").get()
      for doc in docs:
        data = doc.to_dict()
        if MovieTitle in data.get("title", ""):
          info += f"片名：{data['title']}<br>影片介紹：<a href='{data['hyperlink']}' target='_blank'>{data['hyperlink']}</a><br>片長：{data['showLength']} 分鐘<br>上映日期：{data['showDate']}<br><br>"
      return info if info else "未找到相關電影"
    except Exception as e:
      return f"搜尋失敗: {str(e)}"
  return render_template("input.html")

if __name__ == "__main__":
  app.run(host="0.0.0.0", port=8080, debug=True)
