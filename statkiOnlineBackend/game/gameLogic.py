#Sprawdza czy strzał przeciwnika był celny
#Output:
#       0 - pudło
#       1 - trafiony
#       2 - trafiony nie zatopiony
def accurate_shot(table, hit_point):
    if int(hit_point) in table:
        if more_to_hit(table, hit_point):
            return 2
        return 1
    else:
        return 0

def more_to_hit(table, hit_point):
    return False

