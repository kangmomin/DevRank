const token = require('./token')[1]
const axios = require('axios')

module.exports = async msg => {
    let UserName = msg.content
    let EventListNum = 0

    UserName = UserName.split(' ')
    if(UserName == undefined) return msg.channel.send("유저를 입력해 주십시오")
    if(UserName.length > 2) EventListNum = UserName[2]
    UserName = UserName[1]

    msg.channel.send("데이터를 불러오는 중입니다. 약간의 시간이 걸릴수 있습니다...")

    try {
        const folloing = await callFolloing(UserName)
        const follower = await callFollowers(UserName)
        const repos = await callRepos(UserName)
        const created = await callUserAccountCreated(UserName)
        const events = await callEvents(UserName, EventListNum)
    
        msg.channel.send(`
        \`\`\`
현재 팔로워 수 : ${follower} / 팔로잉 수 : ${folloing}
레파지토리 리스트 : 
${repos}

계정 생성 일 : ${created}

이벤트의 수 : ${events}
    \`\`\`
        `)
    } catch (err) {
        console.log(err)
        msg.channel.send(`ERROR! status: ${err.response.status}`)
    }
}

async function callEvents(UserName, EventListNum) {
    let data = await axios.get(`https://api.github.com/users/${UserName}/events`,{
        headers: {
            Authorization: `token ${token}`,
        },
    })

    return data.data.length
}

async function callRepos(UserName) {
    let data = await axios.get(`https://api.github.com/users/${UserName}/repos`,{
        headers: {
            Authorization: `token ${token}`,
        },
    })
    let result = new Array()
    for (data of data.data) {
        result.push(data.name)
    }

    return result
}

async function callUserAccountCreated(UserName) {
    let data = await axios.get(`https://api.github.com/users/${UserName}`,{
        headers: {
            Authorization: `token ${token}`,
        },
    })
    const created = data.data.created_at

    return created
} 

async function callFolloing(UserName) {
    let data = await axios.get(`https://api.github.com/users/${UserName}/following`,{
        headers: {
            Authorization: `token ${token}`,
        },
    })
    data = data.data.length
    return data

}

async function callFollowers(UserName) {
    let data = await axios.get(`https://api.github.com/users/${UserName}/followers`,{
        headers: {
            Authorization: `token ${token}`,
        },
    })
    data = data.data.length
    return data
}