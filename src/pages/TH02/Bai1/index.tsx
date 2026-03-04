import React, { useState } from 'react';
import { Card, Button, Typography, List, Space, Tag } from 'antd';
import { RocketOutlined, HistoryOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const choices = [
  { name: 'Kéo', icon: '✌️' },
  { name: 'Búa', icon: '✊' },
  { name: 'Bao', icon: '✋' },
];

const OanTuTi: React.FC = () => {
  const [history, setHistory] = useState<any[]>([]);
  const [currentResult, setCurrentResult] = useState<string | null>(null);

  const play = (playerChoice: string) => {
    const computerIndex = Math.floor(Math.random() * 3);
    const computerChoice = choices[computerIndex].name;
    let res = '';

    if (playerChoice === computerChoice) res = 'Hòa';
    else if (
      (playerChoice === 'Kéo' && computerChoice === 'Bao') ||
      (playerChoice === 'Búa' && computerChoice === 'Kéo') ||
      (playerChoice === 'Bao' && computerChoice === 'Búa')
    ) res = 'Thắng';
    else res = 'Thua';

    const newLog = {
      player: playerChoice,
      computer: computerChoice,
      result: res,
      time: new Date().toLocaleTimeString(),
    };

    setCurrentResult(`${newLog.player} vs ${newLog.computer} => ${res}`);
    setHistory([newLog, ...history]);
  };

  return (
    <Card title={<Title level={3}>🎮 Trò chơi Oẳn Tù Tì</Title>} style={{ maxWidth: 600, margin: '20px auto' }}>
      <Space direction="vertical" align="center" style={{ width: '100%' }} size="large">
        <Text strong>Chọn vũ khí của bạn:</Text>
        <Space>
          {choices.map((item) => (
            <Button key={item.name} size="large" onClick={() => play(item.name)} type="primary" shape="round">
              {item.icon} {item.name}
            </Button>
          ))}
        </Space>
        
        {currentResult && (
          <Tag color={currentResult.includes('Thắng') ? 'green' : currentResult.includes('Thua') ? 'red' : 'orange'} style={{ fontSize: '18px', padding: '10px' }}>
            {currentResult}
          </Tag>
        )}

        <List
          header={<div><HistoryOutlined /> Lịch sử đấu</div>}
          bordered
          style={{ width: '100%', maxHeight: 300, overflowY: 'auto' }}
          dataSource={history}
          renderItem={(item) => (
            <List.Item>
              <Text type="secondary">[{item.time}]</Text> Bạn: <b>{item.player}</b> - Máy: <b>{item.computer}</b> 
              <Tag style={{ marginLeft: 10 }} color={item.result === 'Thắng' ? 'green' : item.result === 'Thua' ? 'red' : 'default'}>
                {item.result}
              </Tag>
            </List.Item>
          )}
        />
      </Space>
    </Card>
  );
};

export default OanTuTi;