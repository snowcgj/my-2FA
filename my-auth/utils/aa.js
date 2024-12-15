function getTimeStep() {
    const timeWindow = 30; // 时间窗口为 30 秒
    //  math.floor  用来取整
    let time = Math.floor(Date.now() / 1000 / timeWindow); // 当前时间步

    console.log("当前时间步 :", time);

    const timeBuffer = new Uint8Array(8);
    for (let i = 7; i >= 0; i--) { // 将时间步转换为8字节Big-Endian格式
        timeBuffer[i] = time & 0xff;
        time >>= 8;
    }
    return timeBuffer;
}


// 测试时间步


const timeStep = getTimeStep();
console.log("当前时间步 (8字节 Big-Endian):", timeStep);
