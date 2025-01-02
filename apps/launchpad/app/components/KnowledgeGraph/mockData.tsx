const topics = [
  'Machine Learning',
  'Neural Networks',
  'Data Science',
  'Deep Learning',
  'Natural Language Processing',
  'Computer Vision',
  'Reinforcement Learning',
  'Statistical Analysis',
  'Big Data',
  'AI Ethics',
  'Robotics',
  'Cloud Computing',
  'DevOps',
  'Microservices',
  'Containerization',
  'API Design',
  'Database Systems',
  'Web Development',
  'Mobile Development',
  'UI/UX Design',
]

const generateNodes = () => {
  const nodes = []
  for (let i = 0; i < 100; i++) {
    const topic = topics[Math.floor(i / 5)] // 5 nodes per topic
    nodes.push({
      id: i,
      name: `${topic} ${(i % 5) + 1}`,
      description: `A concept related to ${topic}`,
      metadata: {
        type: topic,
        complexity: Math.floor(Math.random() * 5) + 1,
        relevance: Math.random().toFixed(2),
      },
    })
  }
  return nodes
}

const generateLinks = (nodes) => {
  const links = []
  nodes.forEach((node) => {
    // Create 2-3 connections per node
    const numConnections = Math.floor(Math.random() * 2) + 2
    for (let i = 0; i < numConnections; i++) {
      const target = Math.floor(Math.random() * nodes.length)
      if (target !== node.id) {
        links.push({
          source: node.id,
          target,
          strength: Math.random().toFixed(2),
        })
      }
    }
  })
  return links
}

const nodes = generateNodes()
const links = generateLinks(nodes)

const graphData = { nodes, links }

export default graphData
