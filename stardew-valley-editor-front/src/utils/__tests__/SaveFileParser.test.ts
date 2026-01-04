import { describe, it, expect } from 'vitest'
import { SaveFileParser } from '../SaveFileParser'

const MOCK_XML = `
<SaveGame>
  <player>
    <name>Nicolas</name>
    <money>50000</money>
    <maxHealth>100</maxHealth>
    <maxStamina>270</maxStamina>
    <items>
      <Item>
        <name>Parsnip</name>
        <Stack>5</Stack>
      </Item>
    </items>
  </player>
  <gameVersion>1.6</gameVersion>
</SaveGame>
`

describe('SaveFileParser', () => {
  it('deve extrair os status do jogador corretamente', () => {
    // 1. Setup: Criar o DOM a partir da string
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(MOCK_XML, 'text/xml')

    // 2. Execução: Rodar nossa função
    const stats = SaveFileParser.parsePlayerStats(xmlDoc)

    // 3. Asserção: Verificar se o resultado é o esperado
    expect(stats.name).toBe('Nicolas')
    expect(stats.gold).toBe(50000)
    expect(stats.maxHp).toBe(100)
  })

  it('deve extrair itens do inventário corretamente', () => {
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(MOCK_XML, 'text/xml')

    const inventory = SaveFileParser.parseInventory(xmlDoc)

    expect(inventory).toHaveLength(1)
    expect(inventory[0].name).toBe('Parsnip')
    expect(inventory[0].quantity).toBe(5)
  })

})

describe('Segurança do Parser', () => {
    it('deve remover declarações DOCTYPE (Proteção contra XXE)', () => {
      const maliciousXML = `
        <!DOCTYPE foo [<!ELEMENT foo ANY >
        <!ENTITY xxe SYSTEM "file:///etc/passwd" >]>
        <SaveGame>
          <player><name>Hacker</name></player>
        </SaveGame>
      `
      
      const sanitized = SaveFileParser.sanitizeXML(maliciousXML)
      
      expect(sanitized).not.toContain('<!DOCTYPE')
      expect(sanitized).not.toContain('file:///etc/passwd')
    })
  
    it('deve lidar com valores numéricos inválidos sem quebrar', () => {
      const brokenXML = `
        <SaveGame>
          <player>
            <money>MUITO_DINHEIRO</money> </player>
        </SaveGame>
      `
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(brokenXML, 'text/xml')
  
      expect(() => SaveFileParser.parsePlayerStats(xmlDoc)).toThrow('Invalid numeric values')
    })
  })