# 来源的基础镜像
FROM node:12

# 在容器中创建一个目录
RUN mkdir -p /usr/src/wood-judge-back-end

# 定位到容器的工作目录
WORKDIR /usr/src/wood-judge-back-end

# RUN/COPY 是分层的，package.json 提前，只要没修改，就不会重新安装包
COPY package*.json ./

RUN npm install
# RUN cd /usr/src/app/

# 把当前目录所有文件拷贝到 Image下的 /usr/src/wood-judge-back-end 目录下
COPY . .

EXPOSE 3000

CMD [ "node", "index.js" ]
