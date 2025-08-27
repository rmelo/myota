// Script to clear language-related localStorage for testing
// Run this in browser console to simulate first-time user

console.log('=== Clearing Language Storage ===')
console.log('Before clearing:')
console.log('i18nextLng:', localStorage.getItem('i18nextLng'))
console.log('userLanguageChoice:', localStorage.getItem('userLanguageChoice'))

localStorage.removeItem('i18nextLng')
localStorage.removeItem('userLanguageChoice')

console.log('\nAfter clearing:')
console.log('i18nextLng:', localStorage.getItem('i18nextLng'))
console.log('userLanguageChoice:', localStorage.getItem('userLanguageChoice'))

console.log('\n✅ Language storage cleared! Refresh the page to test first-time user experience.')
