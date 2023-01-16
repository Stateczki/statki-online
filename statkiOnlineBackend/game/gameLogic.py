# Sprawdza czy strzał przeciwnika był celny
# Output:
#       0 - pudło
#       1 - trafiony
def accurate_shot(table, hit_point):
    if int(hit_point) in table:
        return 1
    else:
        return 0


def create_list_of_ships(table):
    position_assigned = False
    list_of_ships = []
    ship = []
    for ship_position in table:
        for i in list_of_ships:
            if ship_position in i:
                position_assigned = True
        if not position_assigned:
            index = ship_position
            if accurate_shot(table, index+1):
                while accurate_shot(table, index) == 1:
                    ship.append(index)
                    index += 1
            elif accurate_shot(table, index+11):
                while accurate_shot(table, index) == 1:
                    ship.append(index)
                    index += 11
            else:
                ship.append(index)
            list_of_ships.append(ship.copy())
        ship.clear()
        position_assigned = False
    return list_of_ships



# Sprawdza czy strzał sąsiaduje ze statkiem
def sunk(table, hit_point):
    if (int(hit_point) + 1 in table and int(hit_point) // 11 == (int(hit_point) + 1) // 11) or \
            (int(hit_point) - 1 in table and int(hit_point) // 11 == (int(hit_point) - 1) // 11):
        return True
    if int(int(hit_point) + 11) in table or int(int(hit_point) - 11) in table:
        return True

    return False
