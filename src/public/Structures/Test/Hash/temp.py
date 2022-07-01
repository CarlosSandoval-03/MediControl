class HashTable():
    def __init__(self, k):
        self.elements = 0
        self.size = k
        self.list = [[] for i in range(k)]

    def act_table_size(self):
        factor_carga = self.elements/self.size
        if factor_carga > 0.5:
            new_list = [[] for i in range(self.size*2)]
            self.size = self.size*2
            for i in self.list:
                for j in i:
                    pos = self.hashfunction(j)
                    new_list[pos].append(j)
            self.list = new_list

    def hashfunction(self, element):
        n = 0
        for i in range(4):
            n += ord(element[i])
        return n % self.size

    def find(self, element):
        position = self.hashfunction(element)
        if element in self.list[position]:
            return True
        return False

    def delete(self, element):
        position = self.hashfunction(element)
        while element in self.list[position]:
            self.list[position].remove(element)

    def insert(self, element):
        position = self.hashfunction(element)
        self.list[position].append(element)
        self.elements += 1
        self.act_table_size()

# Test


tabla = HashTable(12)
tabla.insert('Lucia')
tabla.insert('Jaime')
tabla.insert('Alba')
tabla.insert('Pepe')
tabla.insert('Jairo')
tabla.insert('Luciana')
tabla.insert('Lucia')
tabla.insert('Jaime')
tabla.insert('Alba')
tabla.insert('Pepe')
tabla.insert('Jairo')
tabla.insert('Luciana')
# print(tabla.list)

tabla.insert('Simon')
# print(tabla.find('Lucia'))
# print(tabla.find('Jaime'))
# print(tabla.find('Lucas'))
# print(tabla.list)
tabla.delete('Lucia')
print(tabla.list)
