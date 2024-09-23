import { run } from './gemini'

const conversationBoxEl = document.querySelector('.coversation-box')
const promptInputEl = document.getElementById('prompt')

const renderConversation = (request, response) => {
  const conversation = document.createElement('div')
  conversation.classList.add(
    'flex',
    'flex-col',
    'items-center',
    'w-full',
    'p-2',
    'my-2',
    'rounded-lg',
    'bg-white',
    'border',
    'border-gray-300',
    'shadow-md',
    'gap-2',
    'conversation',
    'bg-slate-100'
  )
  conversation.innerHTML = `
    <div class="flex w-full flex-col gap-1">
      <div class="flex w-full flex-row items-center justify-between gap-2">
        <label class="flex-1">User</label>
        <div class="flex-[10] p-2 border border-gray-300 min-h-12 rounded-lg request">${request}</div>
      </div>
      <div class="flex w-full flex-row items-center justify-between gap-2">
        <label class="flex-1">Bot</label>
        <div class="flex-[10] p-2 border border-gray-300 rounded-lg min-h-12 response">${response}</div>
      </div>
    </div>
  `
  conversationBoxEl.appendChild(conversation)

  conversation.scrollIntoView({ behavior: 'smooth', block: 'end' })
}

promptInputEl.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    const request = promptInputEl.value
    promptInputEl.value = ''
    run(request).then(response => {
      renderConversation(request, response)
    })
  }
})
