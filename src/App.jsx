import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [notifications, setNotifications] = useState([
    {
      "id":"1",
      "author": {
        "name": "Mark Webber",
        "src" : "/images/avatar-mark-webber.webp",
        "href":"#"
      },
      "text": "reacted to your recent post",
      "link": {
        "text": "My first tournament today!",
        "href": "#"
      },
      "time": "1m ago",
      "isUnread": true
    },
    {
      "id":"2",
      "author": {
        "name": "Angela Gray",
        "src" : "/images/avatar-angela-gray.webp",
        "href":"#"
      },
      "text": "followed you",
      "time": "5m ago",
      "isUnread": true
    },
    {
      "id":"3",
      "author": {
        "name": "Jacob Thompson",
        "src" : "/images/avatar-jacob-thompson.webp",
        "href":"#"
      },
      "text": "has joined your group",
      "link": {
        "text": "Chess club",
        "href": "#"
      },
      "time": "1 day ago",
      "isUnread": true
    },
    {
      "id":"4",
      "author": {
        "name": "Rizky Hasunaddin",
        "src" : "/images/avatar-rizky-hasanuddin.webp",
        "href":"#"
      },
      "text": "sent you a private message",
      "time": "5 day ago",
      "privateMessage":"Hello, thanks for setting up the Chess Club. I’ve been a member for a few weeks now and I’m already having lots of fun and improving my game.",
      "isUnread": true
    },
    {
      "id":"5",
      "author": {
        "name": "Kimberly Smith",
        "src" : "/images/avatar-kimberly-smith.webp",
        "href":"#"
      },
      "text": "commented on your picture",
      "image":{
        "img":"/images/image-chess.webp"
      },
      "time": "1 week ago",
      "isUnread": false
    },
    {
      "id":"6",
      "author": {
        "name": "Nathan Peterson",
        "src" : "/images/avatar-nathan-peterson.webp",
        "href":"#"
      },
      "text": "reacted to your recent post",
      "link":{
        "text":"5 end-game strategies to increase your win rate",
        "href": "#"
      },
      "time": "2 week ago",
      "isUnread": false
    },
    {
      "id":"7",
      "author": {
        "name": "Anna Kim",
        "src" : "/images/avatar-anna-kim.webp",
        "href":"#"
      },
      "text": "has left group",
      "link": {
        "text": "Chess club",
        "href": "#"
      },
      "time": "2 weeks ago",
      "isUnread": false
    },
  ])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/notifications");
        if(!res.ok){
          throw new Error('prob, bob')
        }
        const json = await res.json();
        setNotifications(json);
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchData();
  }, [])

  function markAllUnread(){
    setNotifications((prev) => prev.map(n => ({...n, isUnread: false})))
  }

  function handleNotificationClick(id){
    setNotifications((prev) => prev.map(n => (
      n.id === id
        ? {...n, isUnread: false}
        : n
    )))
  }

  return (
    <div className="App">
      <div className="container">
        <header>
          <div className="title">
            <h1>Notifications</h1>
            <span className="badge">{notifications && notifications.filter(n => n.isUnread).length}</span>
          </div>
          <button id="mark" onClick={markAllUnread}>Mark all as read</button>
        </header><div className="wrapper">

          {notifications && notifications.map((n) => (
            <div key={n.id} onClick={() => handleNotificationClick(n.id)} className="notification" data-unread={n.isUnread}>
              <div className="notification-content">
                <img src={n.author.src} alt={n.author.name} className="headshot"/>
                <div className="post">
                  <div>
                    <div>
                      <div>
                        <a href={n.author.href}>
                          {n.author.name}
                        </a>
                        <span> {n.text}</span>
                      {n.link && (
                        <a href={n.link.href}> {n.link.text}</a>
                      )}
                      {n.isUnread && (
                        <span className="isUnread"></span>
                      )}
                      </div>
                    </div>
                    <p className="time">{n.time}</p>
                  </div>
                  {n.privateMessage && (
                    <p className="privateMessage">{n.privateMessage}</p>
                  )}
                </div>
              </div>
              {n.image && (<a href={n.image.href}>
                <img src={n.image.src} alt={n.image.alt} />
              </a>)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
